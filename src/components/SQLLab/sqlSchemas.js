// ─── SQL Lab Database Schemas & Seed Data ────────────────────────────────────

export const SCHEMAS = {
  hr: {
    label: '👥 HR System',
    description: 'Sistem Human Resource: karyawan, departemen, gaji, absensi',
    tables: {
      employees: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'position', type: 'TEXT' },
          { name: 'salary', type: 'REAL' },
          { name: 'hire_date', type: 'TEXT' },
          { name: 'status', type: 'TEXT' },
        ],
      },
      departments: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT' },
          { name: 'manager_id', type: 'INTEGER' },
          { name: 'budget', type: 'REAL' },
        ],
      },
      attendance: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'employee_id', type: 'INTEGER' },
          { name: 'date', type: 'TEXT' },
          { name: 'clock_in', type: 'TEXT' },
          { name: 'clock_out', type: 'TEXT' },
          { name: 'status', type: 'TEXT' },
        ],
      },
      leave_requests: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'employee_id', type: 'INTEGER' },
          { name: 'type', type: 'TEXT' },
          { name: 'start_date', type: 'TEXT' },
          { name: 'end_date', type: 'TEXT' },
          { name: 'status', type: 'TEXT' },
          { name: 'approved_by', type: 'INTEGER' },
        ],
      },
    },
  },
  ecommerce: {
    label: '🛒 E-Commerce',
    description: 'Platform belanja online: produk, pesanan, pelanggan, pembayaran',
    tables: {
      customers: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'phone', type: 'TEXT' },
          { name: 'city', type: 'TEXT' },
          { name: 'created_at', type: 'TEXT' },
        ],
      },
      products: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT' },
          { name: 'category', type: 'TEXT' },
          { name: 'price', type: 'REAL' },
          { name: 'stock', type: 'INTEGER' },
          { name: 'is_active', type: 'INTEGER' },
        ],
      },
      orders: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'total_amount', type: 'REAL' },
          { name: 'status', type: 'TEXT' },
          { name: 'created_at', type: 'TEXT' },
          { name: 'payment_method', type: 'TEXT' },
        ],
      },
      order_items: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'order_id', type: 'INTEGER' },
          { name: 'product_id', type: 'INTEGER' },
          { name: 'quantity', type: 'INTEGER' },
          { name: 'unit_price', type: 'REAL' },
        ],
      },
    },
  },
  banking: {
    label: '🏦 Banking',
    description: 'Sistem perbankan: nasabah, rekening, transaksi, pinjaman',
    tables: {
      customers: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT' },
          { name: 'nik', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'phone', type: 'TEXT' },
          { name: 'joined_at', type: 'TEXT' },
        ],
      },
      accounts: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'account_number', type: 'TEXT' },
          { name: 'type', type: 'TEXT' },
          { name: 'balance', type: 'REAL' },
          { name: 'status', type: 'TEXT' },
        ],
      },
      transactions: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'account_id', type: 'INTEGER' },
          { name: 'type', type: 'TEXT' },
          { name: 'amount', type: 'REAL' },
          { name: 'balance_after', type: 'REAL' },
          { name: 'description', type: 'TEXT' },
          { name: 'created_at', type: 'TEXT' },
        ],
      },
      loans: {
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'customer_id', type: 'INTEGER' },
          { name: 'amount', type: 'REAL' },
          { name: 'interest_rate', type: 'REAL' },
          { name: 'status', type: 'TEXT' },
          { name: 'due_date', type: 'TEXT' },
        ],
      },
    },
  },
};
