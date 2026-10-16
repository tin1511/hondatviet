# Firebase security migration notes

This branch changes application code and repository rules only. It does **not** deploy Firestore Rules or modify the live Firebase project.

## Identity and administrator

- Enable **Email/Password** in Firebase Authentication.
- The currently configured trusted administrator is `btin2499@gmail.com`, matching the existing Firestore rule allowlist.
- Create or retain that administrator account in Firebase Authentication and verify its email before testing admin features.
- If the real administrator email is different, update the allowlist consistently in `firestore.rules`, `src/services/firebaseIdentityService.ts`, `src/services/firebaseAuthService.ts`, and `server.ts` before deployment. Do not make the admin role self-assignable.
- New profile documents use the Firebase Authentication UID as the `users/{uid}` document ID. Passwords are not profile fields.

## Credential handling

- AI, TTS, and EmailJS private credentials are no longer written to the shared `system_config_public` documents.
- Put server credentials in the hosting provider's server-side environment settings, never in `VITE_*` variables:
  - `GEMINI_API_KEY`
  - `OPENROUTER_API_KEY`
  - `HUGGINGFACE_API_KEY`
  - `CUSTOM_AI_API_KEY` or `OPENAI_API_KEY`
  - `VIENEU_API_KEY`
  - `EMAILJS_PRIVATE_KEY`
- The privileged AI/TTS/EmailJS test endpoints require a Firebase ID token from the verified allow-listed administrator. The server verifies the token against Firebase Identity Toolkit.
- `FIREBASE_WEB_API_KEY` may be set in server environment settings. If absent, the server attempts to read the web API key from `firebase-applet-config.json`; this web API key is not a service-account secret.

## Existing accounts and data

- The previous localStorage/server account system stored plaintext passwords and used a hard-coded admin credential. That legacy authentication path and its server endpoints are disabled.
- Existing accounts are **not** automatically migrated to Firebase Authentication because plaintext passwords must not be copied into the new identity store. Users must create Firebase Authentication accounts or use Firebase's password-reset flow after their identities exist in Firebase Authentication.
- Legacy local account cache is cleared after a successful Firebase sign-in/registration, and password fields are stripped from cached profiles. This cannot erase copies already stored in other browsers or old server backups.
- Existing legacy Firestore user documents and old `system_config` documents are not deleted by this code change. They remain accessible only to the verified allow-listed admin under the proposed rules. Review and clean up legacy documents after exporting anything that must be retained.
- The legacy `/api/accounts/*` endpoints now return HTTP 410. Any old UI or external integration still calling them must be migrated before relying on account-management operations.

## Before production rollout

1. Review the trusted admin email and create/verify the account in Firebase Authentication.
2. Export/backup existing Firestore data before any cleanup.
3. Test rules in the Firebase Emulator Suite: unauthenticated user, ordinary authenticated user, profile owner, and trusted admin.
4. Test sign-in, registration, email verification, password reset, profile updates, community moderation, saved itineraries/favorites, AI/TTS configuration, and admin test endpoints.
5. Configure server-side secrets in the deployment environment.
6. Deploy the Firestore Rules manually only after the emulator tests pass and a maintenance/rollback plan is ready.

## Current validation status

The code was reviewed statically against the repository interfaces, but no local dependency install, TypeScript build, Firebase Emulator test, or live-device test was available in this change. Treat this branch as a review candidate until CI/build and Firebase emulator tests pass.
