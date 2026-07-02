# Premium Portfolio — Setup Guide (Roman Urdu)

Ye website Next.js + Supabase + Three.js se bani hai. Sab free hai, credit card nahi chahiye.

## Cheezein jo chahiye
1. GitHub account (free)
2. Supabase account — supabase.com (free)
3. Vercel account — vercel.com (free)

---

## STEP 1: Supabase Setup (Database + Login + Image Storage)

1. supabase.com pe jayein → "New Project" banayein
2. Project name, password set karein (yaad rakhein), region: Singapore choose karein (Pakistan ke qareeb)
3. Project ban jaye to left sidebar mein **SQL Editor** kholein
4. `sql/schema.sql` file ka pura content copy karein aur SQL Editor mein paste karke **Run** karein
   - Ye 3 tables banayega: projects, skills, certificates
   - Ye security rules bhi set karega (sirf aap edit kar sakein, baaki sab sirf dekh sakein)
   - Ye ek image storage bucket bhi bana dega
5. Left sidebar mein **Authentication → Users** jayein → **Add User** → apna email/password daalein
   - Ye aapka ADMIN LOGIN hoga (isi se aap /login page pe login karenge)
6. Left sidebar mein **Project Settings → API** jayein
   - `Project URL` aur `anon public key` copy kar lein — ye agle step mein chahiye

---

## STEP 2: Code GitHub Pe Daalein

1. GitHub.com pe jaake naya repository banayein (e.g. "my-portfolio")
2. Is poore folder ko us repository mein upload kar dein (GitHub website se drag-drop bhi kar sakte hain, ya "GitHub Desktop" app use karein — coding ki zaroorat nahi)

---

## STEP 3: Vercel Pe Deploy (Free)

1. vercel.com pe GitHub account se sign up karein
2. **Add New Project** → apni GitHub repository select karein
3. Deploy se pehle **Environment Variables** section mein ye 2 add karein:
   - `NEXT_PUBLIC_SUPABASE_URL` = (Step 1 se copy kiya URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Step 1 se copy ki hui key)
4. **Deploy** button dabayein — 2-3 minute mein live ho jayega
5. Aapko ek free URL milega: `your-site.vercel.app`

---

## STEP 4: Use Karna

- Public site: `your-site.vercel.app`
- Admin login: `your-site.vercel.app/login` — Step 1.5 wala email/password use karein
- Login ke baad `/admin` pe Projects, Skills, Certificates add/delete kar sakte hain — image upload bhi wahin se hoga

---

## Baad Mein Domain Add Karna
Vercel ke "Domains" tab mein apna khareeda hua domain (e.g. sirfaris.com) daal ke free mein connect kar sakte hain.

## Agar Kuch Kaam Na Kare
Sabse pehle Vercel ke "Deployments" tab mein error log check karein — 90% cases mein wajah env variables galat/missing hoti hai.
