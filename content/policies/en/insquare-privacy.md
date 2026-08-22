# Privacy Policy (insquare)

**Jinmo Kang** (the "Operator"), an individual developer, operates the private photo app **insquare** (the "Service") and follows applicable privacy law, including Korea’s Personal Information Protection Act.

This is a **personal app**, not a Quartz company or brand product.

- Privacy officer: Jinmo Kang
- Access, deletion, and other requests: [ilovejs97@gmail.com](mailto:ilovejs97@gmail.com)
- In-app contact: Profile → **Send feedback**

## 1. Information collected

The Service does not offer email-and-password registration. Accounts are created with Google, Apple, or Kakao sign-in.

### (1) Account and profile
- Email from the sign-in provider (or an Apple Hide My Email relay address), display name, and profile photo if provided
- Firebase user ID (UID)
- Nickname and profile photo set by the user

### (2) User Content
- Photos, captions, and comments posted in rooms
- Room names, invite codes, and membership data

Photos are re-encoded on upload. EXIF metadata, including GPS location, is not kept.

### (3) Device, session, and notifications
- A random device UUID created per install (not a hardware ID or advertising ID), used so one account stays signed in on one device
- Model name of the last sign-in device
- FCM token and notification preferences for push
- Minimal technical data such as app version and OS for troubleshooting

### (4) Advertising
- For free use, Google AdMob may process advertising ID, IP address, approximate device data, and ad interactions. On iOS, denying tracking still lets the app work; personalized ads may be limited.

Not collected: a password created by this app, contacts, precise location, payment data, or information aimed at children under 13.

## 2. Purposes
- Identifying users, signing in, and keeping a single-device session
- Sharing photos and comments in invite-only rooms
- Push notifications the user enables (new posts, comments, joins, leaves)
- Abuse prevention, support, and legal compliance
- Banner ads on the room list for the free plan

## 3. Processors and sharing
The Operator does not sell photos or use them in ads. Processors used to run the Service:

| Party | Role |
|------|------|
| Google Firebase | Auth, database, Cloud Functions, push |
| Google Sign-In | Account authentication |
| Apple | Sign in with Apple |
| Kakao | Kakao sign-in |
| Cloudflare (R2 and Worker) | Storage and delivery of new photos |
| Cloudinary | Storage and delivery of older photos, where applicable |
| Google AdMob | Banner ads |
| Google Forms | In-app feedback and reports |

Photos are visible only to members of rooms the user joins. They are not disclosed otherwise except as required by law.

## 4. Advertising
The app may show a Google AdMob banner at the bottom of the room list. See [Google’s Privacy Policy](https://policies.google.com/privacy). The Operator does not send user photos or comments to advertisers for ad personalization.

## 5. Permissions
The app may request:
- Camera and photos: choosing post and profile images
- Notifications: push delivery
- Network: sign-in, uploads, ads
- (iOS) Tracking: personalized ads. Core features work if denied.

Denying a permission only limits that feature.

## 6. Retention and account deletion

### Partial deletion in the app
Users can delete their own posts and comments in the app.

### Account deletion
**Settings → Delete account** removes:
- The Firebase account and profile
- The user’s posts, comments, and photos (new photos on R2; older photos on Cloudinary where applicable)
- Sign-in sessions on all devices

Signing in again with the same social account starts a new account.

If deletion is incomplete, email [ilovejs97@gmail.com](mailto:ilovejs97@gmail.com). After identity checks, the request is handled within a reasonable time.

Records may be kept longer only if the law requires it.

## 7. Children
The Service is not directed at children under 13 and does not knowingly collect their personal information. Accounts of users under 13 are deleted.

## 8. User rights
Users may request access, correction, deletion, or restriction by email. In the app they can edit a profile, delete Content, and delete the account.

## 9. International processing
Firebase, Google, Apple, Kakao, Cloudflare, Cloudinary, and AdMob may process data on servers outside Korea, only for the purposes in sections 2 and 3.

## 10. Security
Reasonable measures such as HTTPS are used. Internet transmission and storage cannot be guaranteed completely secure.

## 11. Changes
Material changes are posted on this page with the revision date.

## 12. Contact
- Privacy officer: Jinmo Kang
- Email: [ilovejs97@gmail.com](mailto:ilovejs97@gmail.com)

This Policy takes effect on August 22, 2026, and replaces the previous Policy issued in the name of Quartz.
