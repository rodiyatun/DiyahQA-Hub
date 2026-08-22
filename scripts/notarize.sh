#!/bin/bash
# ============================================================
# DiyahQA Hub - Apple Notarization Script
# ============================================================
# Jalankan setelah: npm run package
# Isi variabel di bawah sebelum menjalankan
# ============================================================

set -e

# ─── KONFIGURASI — ISI DENGAN DATA ANDA ─────────────────────
APPLE_ID="your@apple-id.com"
TEAM_ID="XXXXXXXXXX"
APP_PASSWORD="xxxx-xxxx-xxxx-xxxx"
CERT_NAME="Developer ID Application: Nama Anda (TEAM_ID)"

APP_NAME="DiyahQA Hub"
VERSION="1.1.2"
DMG_PATH="dist/${APP_NAME}-${VERSION}-arm64.dmg"
APP_PATH="dist/mac-arm64/${APP_NAME}.app"
# ─────────────────────────────────────────────────────────────

echo "╔══════════════════════════════════════════╗"
echo "║   DiyahQA Hub — Apple Notarization       ║"
echo "╚══════════════════════════════════════════╝"
echo ""

echo "📋 Step 1: Checking certificate..."
security find-identity -v -p codesigning | grep "Developer ID" || { echo "❌ Certificate not found!"; exit 1; }
echo "✅ Certificate found"

echo ""
echo "🔏 Step 2: Code signing app..."
codesign --force --deep --options runtime \
  --sign "$CERT_NAME" "$APP_PATH"
echo "✅ App signed"

echo ""
echo "🔍 Step 3: Verifying signature..."
codesign --verify --deep --strict "$APP_PATH"
echo "✅ Signature verified"

echo ""
echo "📤 Step 4: Submitting to Apple Notary Service..."
xcrun notarytool submit "$DMG_PATH" \
  --apple-id "$APPLE_ID" \
  --password "$APP_PASSWORD" \
  --team-id "$TEAM_ID" \
  --wait --progress

echo ""
echo "📎 Step 5: Stapling ticket..."
xcrun stapler staple "$DMG_PATH"
xcrun stapler staple "$APP_PATH"
echo "✅ Ticket stapled"

echo ""
spctl --assess --verbose=4 "$APP_PATH" 2>&1

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║  ✅ NOTARISASI SELESAI! Siap distribusi   ║"
echo "╚══════════════════════════════════════════╝"
echo "📦 $DMG_PATH"
