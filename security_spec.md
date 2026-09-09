# Security Specification: Python Classroom Runner Sync

## Data Invariants
- **Authentication**: A student must be authenticated to write or read their `UserProgress` document.
- **Identity Locking**: A student can only view and modify a document where `userId` strictly matches `request.auth.uid`. No student can read, create, or edit another student's progress.
- **Audit Fields**: The `createdAt` field must be immutable once created.
- **Timestamp Integrity**: The `updatedAt` field must be strictly assigned to `request.time`.
- **Key Whitelisting**: Updates to properties must correspond exactly to verified learner states, preventing injection of malicious properties.
- **Value Constraints**: `soundVolume` must be a valid float/number between 0.0 and 1.0. `bonusCredits` must be a valid number >= 0.

## The "Dirty Dozen" Payloads (Expected to be REJECTED with PERMISSION_DENIED)
1. **Unauthenticated Read**: Requesting any document in `/users` without `auth` credentials.
2. **Unauthenticated Write**: Creating or writing any document in `/users` with no `auth` object.
3. **Identity Impersonation (Create)**: Creating a progress document under `/users/student_A` while signed in as `student_B` (`userId` set to `student_B` but path is `/users/student_A`).
4. **Identity Impersonation (Update)**: Updating `student_A`'s record at `/users/student_A` using `student_B`'s credentials.
5. **PII Blanket Read Attempt**: Trying to list or read all student documents from the client `db.collection('users')` without a specific doc path check.
6. **Immutable Theft (createdAt)**: Overwriting the primary `createdAt` timestamp during an update.
7. **Client Timer Spoof**: Supplying a custom client timestamp in `updatedAt` instead of `request.time`.
8. **Credit Inflation Attack**: Submitting a ghost update that forcefully modifies `bonusCredits` using unreasonable increments without proper schema bounds.
9. **Malicious Parameter Injection**: Sending an update containing unmapped fields (e.g., `isAdmin: true` or `bypassed: true`).
10. **Volume Level Poisoning**: Submitting a `soundVolume` of `100.0` or `-5.0` to crash or glitch the audio manager.
11. **Type Distortion**: Setting `completedLessons` to a string instead of an array.
12. **Boundary Escape (Invalid Path characters)**: Supplying a document path containing malicious injection characters (e.g., containing `../` or special control chars) to bypass routing checks.
