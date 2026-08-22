#!/bin/bash
# ============================================================
# DiyahQA Hub — Setup Code Signing Credentials
# Jalankan SEKALI setelah dapat Apple Developer Program
# ============================================================

echo "╔══════════════════════════════════════════╗"
echo "║   DiyahQA Hub — Setup Code Signing       ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Isi data Anda di sini:
read -p "Apple ID (email): " APPLE_ID
read -p "Team ID (dari developer.apple.com/account): " TEAM_ID
read -s -p "App-Specific Password (xxxx-xxxx-xxxx-xxxx): " APP_PASS
echo ""

# Simpan ke keychain dengan aman
xcrun notarytool store-credentials "diyahqa-notarize" \
  --apple-id "$APPLE_ID" \
  --team-id "$TEAM_ID" \
  --password "$APP_PASS"

echo ""
echo "✅ Credentials tersimpan di Keychain sebagai 'diyahqa-notarize'"
echo "   Sekarang jalankan: bash scripts/sign-and-notarize.sh"
