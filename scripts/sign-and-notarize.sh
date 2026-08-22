#!/bin/bash
# ============================================================
# DiyahQA Hub — Full Code Sign + Notarisasi + Package
# Jalankan setelah setup-signing.sh berhasil
# ============================================================
set -e

APP_NAME="DiyahQA Hub"
VERSION=$(node -p "require('./package.json').version")
APP_PATH="dist/mac-arm64/${APP_NAME}.app"
DMG_PATH="dist/${APP_NAME}-${VERSION}-arm64.dmg"
KEYCHAIN_PROFILE="diyahqa-notarize"

# Ambil cert name otomatis
CERT_NAME=$(security find-identity -v -p codesigning | grep "Developer ID Application" | head -1 | sed 's/.*"\(.*\)"/\1/')

if [ -z "$CERT_NAME" ]; then
  echo "❌ Certificate 'Developer ID Application' tidak ditemukan!"
  echo "   Ikuti STEP 2 di panduan untuk install certificate."
  exit 1
fi

echo "╔══════════════════════════════════════════╗"
echo "║   DiyahQA Hub — Sign & Notarize          ║"
echo "╚══════════════════════════════════════════╝"
echo "📋 Certificate: $CERT_NAME"
echo "📦 App: $APP_PATH"
echo "📀 DMG: $DMG_PATH"
echo ""

# STEP 1: Build production
echo "🔨 [1/6] Building production app..."
npm run build

# STEP 2: Package with electron-builder
echo ""
echo "📦 [2/6] Packaging with electron-builder..."
CSC_NAME="$CERT_NAME" npx electron-builder --mac --arm64 --publish never

# STEP 3: Deep sign the app
echo ""
echo "🔏 [3/6] Deep code signing..."
codesign --force --deep --options runtime \
  --entitlements electron/entitlements.plist \
  --sign "$CERT_NAME" \
  "$APP_PATH"

# STEP 4: Verify signature
echo ""
echo "🔍 [4/6] Verifying signature..."
codesign --verify --deep --strict --verbose=2 "$APP_PATH"
echo "✅ Signature valid!"

# STEP 5: Notarisasi
echo ""
echo "📤 [5/6] Submitting to Apple Notary Service..."
echo "   ⏱️  Estimasi: 2–15 menit, harap tunggu..."
xcrun notarytool submit "$DMG_PATH" \
  --keychain-profile "$KEYCHAIN_PROFILE" \
  --wait \
  --progress

# STEP 6: Staple
echo ""
echo "📎 [6/6] Stapling notarization ticket..."
xcrun stapler staple "$DMG_PATH"
xcrun stapler staple "$APP_PATH"

# Final verify
echo ""
spctl --assess --verbose=4 "$APP_PATH" 2>&1
xcrun stapler validate "$DMG_PATH"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅ SELESAI! App sudah signed & notarized.       ║"
echo "║  User bisa install tanpa warning Gatekeeper. 🚀  ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "📦 File siap distribusi: $DMG_PATH"
