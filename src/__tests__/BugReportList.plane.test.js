/**
 * UI Tests — BugReportList Plane Integration Changes
 * File: src/__tests__/BugReportList.plane.test.js
 * Requirements: 2.1, 2.10, 3.1, 3.8, 4.1, 4.3–4.8
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within, act } from '@testing-library/react';
import BugReportList from '../components/BugReportList';

// ── Sample bug data ──────────────────────────────────────────────────────────
const makeBug = (overrides = {}) => ({
  id: 1,
  bug_number: 'BUG-001',
  title: 'Sample Bug',
  description: 'A test bug',
  steps_to_reproduce: '',
  severity: 'Medium',
  priority: 'Medium',
  status: 'Open',
  environment: '',
  expected_behavior: '',
  actual_behavior: '',
  evidence_url: '',
  reporter: 'Tester',
  assignee: '',
  module: 'Auth',
  linked_testcase_id: null,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  plane_issue_id: null,
  plane_issue_url: null,
  plane_status: null,
  ...overrides,
});

const sampleProjects = [{ id: 1, name: 'Project A' }];

// ── Mock window.api ──────────────────────────────────────────────────────────
beforeEach(() => {
  window.api = {
    getBugReports:           jest.fn().mockResolvedValue([]),
    getPlaneConfig:          jest.fn().mockResolvedValue({}),
    syncPlaneStatus:         jest.fn().mockResolvedValue({ updated: 0, failed: 0, errors: [] }),
    savePlaneConfig:         jest.fn().mockResolvedValue({ success: true }),
    transferBugToPlane:      jest.fn().mockResolvedValue({
      success: true,
      planeIssueId: 'pi-1',
      planeIssueUrl: 'https://app.plane.so/ws/projects/p/issues/pi-1',
    }),
    transferBugsBulkToPlane: jest.fn().mockResolvedValue({ success: true, results: [] }),
    createBugReport:         jest.fn().mockResolvedValue({}),
    updateBugReport:         jest.fn().mockResolvedValue({}),
    deleteBugReport:         jest.fn().mockResolvedValue({ success: true }),
    importBugCSV:            jest.fn().mockResolvedValue({ imported: 0, skipped: 0, errors: [] }),
    importBugPlane:          jest.fn().mockResolvedValue({ imported: 0, skipped: 0, errors: [] }),
    openFileDialog:          jest.fn().mockResolvedValue(null),
    saveFileDialog:          jest.fn().mockResolvedValue({}),
  };
});

// ── Helper: render & wait for bugs to load ───────────────────────────────────
async function renderAndWait(bugs = [], planeConfig = {}) {
  window.api.getBugReports.mockResolvedValue(bugs);
  window.api.getPlaneConfig.mockResolvedValue(planeConfig);
  render(<BugReportList projects={sampleProjects} selectedProject={null} />);
  // Wait for initial data load
  await waitFor(() => {
    // The table header is always rendered
    expect(screen.getByText(/Plane Status/i)).toBeInTheDocument();
  });
}

// ============================================================================
// Requirement 4.1 — Kolom "Plane Status" ada di tabel
// ============================================================================

test('Req 4.1 — kolom "Plane Status" ada di header tabel', async () => {
  await renderAndWait([]);
  expect(screen.getByText(/Plane Status/i)).toBeInTheDocument();
});

// ============================================================================
// Requirement 4.2 — Bug tanpa plane_issue_id menampilkan — di kolom Plane Status
// ============================================================================

test('Req 4.2 — bug tanpa plane_issue_id menampilkan "—" di kolom Plane Status', async () => {
  const bug = makeBug({ id: 1, plane_issue_id: null, plane_status: null });
  await renderAndWait([bug]);

  await waitFor(() => {
    expect(screen.getByText('Sample Bug')).toBeInTheDocument();
  });

  // Find the data row and check that the em dash is present for the Plane Status cell
  const rows = screen.getAllByRole('row');
  const dataRow = rows.find(r => within(r).queryByText('Sample Bug'));
  expect(dataRow).toBeTruthy();
  // The — character should appear in the row (rendered by PlaneStatusBadge when no plane_issue_id)
  expect(within(dataRow).getAllByText('—').length).toBeGreaterThan(0);
});

// ============================================================================
// Requirement 4.4 — badge Todo → abu-abu (plane-badge-grey)
// ============================================================================

test('Req 4.4 — badge Todo memiliki class plane-badge-grey', async () => {
  const bug = makeBug({
    id: 2,
    plane_issue_id: 'pi-1',
    plane_issue_url: 'https://app.plane.so/ws/projects/p/issues/pi-1',
    plane_status: 'Todo',
  });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));
  const badge = document.querySelector('.plane-badge-grey');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toBe('Todo');
});

// ============================================================================
// Requirement 4.5 — badge In Progress → biru (plane-badge-blue)
// ============================================================================

test('Req 4.5 — badge In Progress memiliki class plane-badge-blue', async () => {
  const bug = makeBug({
    id: 3,
    plane_issue_id: 'pi-2',
    plane_issue_url: 'https://app.plane.so/ws/projects/p/issues/pi-2',
    plane_status: 'In Progress',
  });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));
  const badge = document.querySelector('.plane-badge-blue');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toBe('In Progress');
});

// ============================================================================
// Requirement 4.6 — badge Done → hijau (plane-badge-green)
// ============================================================================

test('Req 4.6 — badge Done memiliki class plane-badge-green', async () => {
  const bug = makeBug({
    id: 4,
    plane_issue_id: 'pi-3',
    plane_issue_url: 'https://app.plane.so/ws/projects/p/issues/pi-3',
    plane_status: 'Done',
  });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));
  const badge = document.querySelector('.plane-badge-green');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toBe('Done');
});

// ============================================================================
// Requirement 4.7 — badge Cancelled → merah (plane-badge-red)
// ============================================================================

test('Req 4.7 — badge Cancelled memiliki class plane-badge-red', async () => {
  const bug = makeBug({
    id: 5,
    plane_issue_id: 'pi-4',
    plane_issue_url: 'https://app.plane.so/ws/projects/p/issues/pi-4',
    plane_status: 'Cancelled',
  });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));
  const badge = document.querySelector('.plane-badge-red');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toBe('Cancelled');
});

// ============================================================================
// Requirement 4.8 — badge status tidak dikenal → abu-abu muda (plane-badge-light-grey)
// ============================================================================

test('Req 4.8 — badge status tidak dikenal memiliki class plane-badge-light-grey', async () => {
  const bug = makeBug({
    id: 6,
    plane_issue_id: 'pi-5',
    plane_issue_url: 'https://app.plane.so/ws/projects/p/issues/pi-5',
    plane_status: 'Unknown Status',
  });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));
  const badge = document.querySelector('.plane-badge-light-grey');
  expect(badge).not.toBeNull();
  expect(badge.textContent).toBe('Unknown Status');
});

// ============================================================================
// Requirement 3.1 — toolbar bulk menampilkan tombol transfer saat row dipilih
// ============================================================================

test('Req 3.1 — toolbar menampilkan tombol "Transfer ke Plane" saat row dipilih', async () => {
  const bug = makeBug({ id: 1 });
  await renderAndWait([bug]);

  await waitFor(() => screen.getByText('Sample Bug'));

  // The bulk transfer button should NOT appear before any selection
  expect(screen.queryByText(/Transfer ke Plane/i)).not.toBeInTheDocument();

  // Click the row checkbox (first checkbox is select-all, second is row checkbox)
  const checkboxes = screen.getAllByRole('checkbox');
  const rowCheckbox = checkboxes[1];
  fireEvent.click(rowCheckbox);

  // Now the bulk transfer button should appear in the toolbar
  await waitFor(() => {
    expect(screen.getByText(/Transfer ke Plane/i)).toBeInTheDocument();
  });
});

// ============================================================================
// Requirement 3.1 — tombol bulk menampilkan jumlah bug yang dipilih
// ============================================================================

test('Req 3.1 — tombol bulk transfer menampilkan jumlah bug yang dipilih', async () => {
  const bugs = [
    makeBug({ id: 1, title: 'Bug A', bug_number: 'BUG-001' }),
    makeBug({ id: 2, title: 'Bug B', bug_number: 'BUG-002' }),
  ];
  await renderAndWait(bugs);

  await waitFor(() => screen.getByText('Bug A'));

  // Select-all checkbox is index 0, row checkboxes start at 1
  const checkboxes = screen.getAllByRole('checkbox');
  // Click select-all
  fireEvent.click(checkboxes[0]);

  await waitFor(() => {
    // Should show count = 2
    expect(screen.getByText(/Transfer ke Plane \(2\)/i)).toBeInTheDocument();
  });
});

// ============================================================================
// Requirement 2.1 — setiap baris memiliki tombol transfer ✈️
// ============================================================================

test('Req 2.1 — setiap baris memiliki tombol aksi "Transfer ke Plane" (✈️)', async () => {
  const bugs = [
    makeBug({ id: 1, title: 'Bug A', bug_number: 'BUG-001' }),
    makeBug({ id: 2, title: 'Bug B', bug_number: 'BUG-002' }),
  ];
  await renderAndWait(bugs);

  await waitFor(() => screen.getByText('Bug A'));

  // Each row should have a transfer button via title attribute
  // Note: bug without plane_issue_id → title = 'Transfer ke Plane'
  // bug with plane_issue_id → title = 'Transfer ulang ke Plane'
  const transferButtons = document.querySelectorAll('[title*="Transfer ke Plane"]');
  expect(transferButtons.length).toBe(2);
});

// ============================================================================
// Requirement 2.10 — loading state aktif saat transfer single berjalan
// ============================================================================

test('Req 2.10 — tombol transfer menampilkan ⏳ dan disabled saat transfer sedang berjalan', async () => {
  const bug = makeBug({
    id: 1,
    plane_issue_id: null,
  });
  await renderAndWait([bug], { apiKey: 'test-key', workspaceSlug: 'my-ws' });

  await waitFor(() => screen.getByText('Sample Bug'));

  // Make transferBugToPlane hang indefinitely so we can check the loading state
  let resolveTransfer;
  window.api.transferBugToPlane.mockImplementation(
    () => new Promise(resolve => { resolveTransfer = resolve; })
  );

  // Click the ✈️ transfer button in the row actions
  const transferButton = document.querySelector('[title="Transfer ke Plane"]');
  expect(transferButton).not.toBeNull();

  await act(async () => {
    fireEvent.click(transferButton);
  });

  // While transfer is in progress, button should show ⏳ and be disabled
  await waitFor(() => {
    // The button icon should now be ⏳ and the button should be disabled
    const allBtns = screen.getAllByRole('button');
    const planeBtn = allBtns.find(b => b.textContent === '⏳' && b.disabled);
    expect(planeBtn).toBeTruthy();
  });

  // Resolve the promise to clean up
  await act(async () => {
    resolveTransfer({ success: true, planeIssueId: 'pi-1', planeIssueUrl: 'https://plane.so/issue' });
  });
});

// ============================================================================
// Requirement 3.8 — semua tombol aksi disabled saat bulkTransferring === true
// ============================================================================

test('Req 3.8 — semua tombol aksi disabled saat bulk transfer berjalan', async () => {
  const bugs = [
    makeBug({ id: 1, title: 'Bug A', bug_number: 'BUG-001' }),
  ];
  await renderAndWait(bugs, { apiKey: 'test-key', workspaceSlug: 'my-ws' });

  await waitFor(() => screen.getByText('Bug A'));

  // Make bulk transfer hang indefinitely
  let resolveBulk;
  window.api.transferBugsBulkToPlane.mockImplementation(
    () => new Promise(resolve => { resolveBulk = resolve; })
  );
  // Suppress window.confirm to auto-accept
  jest.spyOn(window, 'confirm').mockReturnValue(true);

  // Select the row
  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[1]);

  await waitFor(() => {
    expect(screen.getByText(/Transfer ke Plane/i)).toBeInTheDocument();
  });

  // Click the bulk transfer button
  await act(async () => {
    // Find and click the Transfer ke Plane (1) button
    const btn = screen.getByText(/Transfer ke Plane \(1\)/i).closest('button');
    fireEvent.click(btn);
  });

  // While bulkTransferring === true, all action buttons should be disabled
  await waitFor(() => {
    // "Tambah Bug" button
    const addButton = screen.getByText(/\+ Tambah Bug/i).closest('button');
    expect(addButton).toBeDisabled();

    // Delete bulk button
    const deleteBtn = screen.queryByText(/Delete/i)?.closest('button');
    if (deleteBtn) expect(deleteBtn).toBeDisabled();

    // The bulk transfer button itself should now show loading text and be disabled
    const transferingBtn = screen.getByText(/Mentransfer/i).closest('button');
    expect(transferingBtn).toBeDisabled();

    // Row checkboxes should be disabled
    const rowCheckbox = screen.getAllByRole('checkbox')[1];
    expect(rowCheckbox).toBeDisabled();
  });

  // Resolve bulk transfer to clean up
  await act(async () => {
    resolveBulk({ success: true, results: [] });
  });

  // Restore window.confirm
  window.confirm.mockRestore();
});

// ============================================================================
// Requirement 3.8 — tombol edit dan delete per baris disabled saat bulkTransferring
// ============================================================================

test('Req 3.8 — tombol Edit dan Delete per baris disabled saat bulk transfer berjalan', async () => {
  const bug = makeBug({ id: 1 });
  await renderAndWait([bug], { apiKey: 'test-key', workspaceSlug: 'my-ws' });

  await waitFor(() => screen.getByText('Sample Bug'));

  // Make bulk transfer hang
  window.api.transferBugsBulkToPlane.mockImplementation(
    () => new Promise(() => {}) // never resolves in this test
  );
  jest.spyOn(window, 'confirm').mockReturnValue(true);

  // Select the row
  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[1]);

  await waitFor(() => screen.getByText(/Transfer ke Plane \(1\)/i));

  // Trigger bulk transfer
  await act(async () => {
    const btn = screen.getByText(/Transfer ke Plane \(1\)/i).closest('button');
    fireEvent.click(btn);
  });

  // All row-level action buttons (✏️ Edit, 🗑️ Delete, ✈️ Transfer) should be disabled
  await waitFor(() => {
    const editButton = screen.getByTitle('Edit');
    const deleteButton = screen.getByTitle('Delete');
    const transferButton = document.querySelector('[title*="Transfer ke Plane"]');

    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
    expect(transferButton).toBeDisabled();
  });

  window.confirm.mockRestore();
});

// ============================================================================
// Additional: Plane Status header has sync button (🔄)
// ============================================================================

test('Header kolom "Plane Status" menampilkan tombol sync 🔄', async () => {
  await renderAndWait([]);
  // The sync button is rendered inside the Plane Status header cell
  const syncButton = screen.getByTitle('Sync status dari Plane');
  expect(syncButton).toBeInTheDocument();
  expect(syncButton.textContent).toBe('🔄');
});

// ============================================================================
// Additional: multiple Plane status badges render correctly in the same table
// ============================================================================

test('Beberapa status Plane ditampilkan dengan badge yang tepat di satu tabel', async () => {
  const bugs = [
    makeBug({ id: 1, title: 'Bug Todo',    bug_number: 'BUG-001', plane_issue_id: 'pi-1', plane_status: 'Todo' }),
    makeBug({ id: 2, title: 'Bug WIP',     bug_number: 'BUG-002', plane_issue_id: 'pi-2', plane_status: 'In Progress' }),
    makeBug({ id: 3, title: 'Bug Done',    bug_number: 'BUG-003', plane_issue_id: 'pi-3', plane_status: 'Done' }),
    makeBug({ id: 4, title: 'Bug Cancel',  bug_number: 'BUG-004', plane_issue_id: 'pi-4', plane_status: 'Cancelled' }),
    makeBug({ id: 5, title: 'Bug No Plane',bug_number: 'BUG-005', plane_issue_id: null,   plane_status: null }),
  ];
  await renderAndWait(bugs);

  await waitFor(() => screen.getByText('Bug Todo'));

  expect(document.querySelector('.plane-badge-grey')).not.toBeNull();
  expect(document.querySelector('.plane-badge-blue')).not.toBeNull();
  expect(document.querySelector('.plane-badge-green')).not.toBeNull();
  expect(document.querySelector('.plane-badge-red')).not.toBeNull();
});
