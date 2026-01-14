## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Animations library -> use only client side => "use client" - de istifade edilir
1. react-type-animation ("use client" - de istifade edilir)-> Textin animationlarini yaradir. 
  İstənilən mətni yazılırmış kimi göstərən would you learn(sözlər yazılır, gözləyir, silir, yenisini yazır və s) yüngül React komponenti.
  Istifade yeri: (travel/src/app/(pages)/(routes)/(home)/_components/SectionTwo.tsx)
  “use client”: Bəli — animasiya DOM-a bağlıdır, serverdə işləmir.

# istifade yeri: 
1. Hero section (saytın yuxarı hissəsi): “Biz … edirik / Biz … qururuq” kimi dinamik mətnlər
2. Loading / status mesajları: “Yüklənir…”, “Məlumatlar hazırlanır…”
3. Landing page: məhsulun xüsusiyyətlərini növbə ilə göstərməkShuffle
4. CTA mətnləri: diqqət cəlb edən animasiyalı başlıqlar

2. framer-motion ("use client" - de istifade edilir)-> div leri hereket eletdirmekden , translate kimi ishlerde 
   ve sair istifade edilir 
  Istifade Yeri: travel/src/app/(pages)/(routes)/(home)/_components/SectionOne.tsx
3. Call Amanda=> ("use client" - de istifade edilir)-> "use client" - de istifade edilir
4. react-intersection-observer -> "use client" - de  Elementin viewport-a düşməsini izləyir (scroll-based effektlər üçün).
   Istifade Yeri: travel/src/app/(pages)/(routes)/about/_components/TravelStats.tsx
5. react-countup -> "use client" - de istifade edilir Rəqəmlərin “sayılması” (0 → N) animasiyası.
   Istifade Yeri: travel/src/app/(pages)/(routes)/about/_components/TravelStats.tsx
6. react-fast-marquee -> "use client" - de istifade edilir mətn/loqo karuseli, infiniti sliderler icin
   Istifade Yeri: travel/src/app/(pages)/(routes)/about/_components/CompanyLogos.tsx
7. swiper js -> slider lar icin
   Istifade Yeri: travel/src/app/(pages)/(routes)/(home)/_components/Hero.tsx

### Example

```
 <TypeAnimation
      sequence={[
        "Salam! 👋",     // yazır
        1000,            // 1 saniyə gözləyir
        "Mən Elmaram.",  // əvvəlkini silib bunu yazır
        1000,
        "React öyrənirik!",
        1500,
      ]}
      wrapper="h2"
      cursor={true}
      repeat={Infinity}
      speed={40}
    />
```


# ReCAPTCHA ->  bun add react-google-recaptcha  -> recaptcha sayitina get ayarlari et secret key i env faylinda saxla
  google ya isdek atmaq ichin env daki recaptcha secret key i istifade edirik
  
# EMAIL OUTLOOK GONDERMEK ICHIN => https://resend.com/onboarding   to: "elmar.amanov.2015@mail.ru",  login olduqun emaili yazmalisin 


# import { redirect, usePathname, useSearchParams, useRouter } from "next/navigation"; 

# redirect("/home")  => home seyfesine redirect ol

# const pathname = usePathname();  => pathname => olduqumuz seyfenin pathini verir ex: / , /home , /about , /contact , /news

# const searchParams = useSearchParams();  =>   (urlimiz -> /search?name="foo")  searchParams.get("name") => "foo"

# const urlSearchParams = new URLSearchParams({name: "foo", sname: "fooo"}).toString(); => name=foo&sname=fooo

# const router = useRouter();   => router.push(`/search?{urlSearchParams}`) => search?name=foo&sname=fooo -> search seyfesine name=foo&sname=fooo bu parametirler ile yonlenecek


### Prisma Lessons
Prisma Nədir?
Prisma açıq mənbə (open-source) bir ORM (Object-Relational Mapping) kitabxanasıdır. Bu kitabxana, JavaScript və TypeScript ilə işləyən tətbiqlər üçün məlumat bazası əməliyyatlarını asanlaşdırır. Prisma, məlumat bazası ilə əlaqə yaratmaq və onu idarə etmək üçün yüksək performanslı və etibarlı bir yol təqdim edir. Bu, SQL sorğuları yazmadan, məlumat bazası ilə daha asan işləməyə kömək edir.

1. Prisma ilə işə başlamaq üçün bir neçə asılılıq quraşdırmalısınız: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction
```
npm install prisma --save-dev
npm install @prisma/client
-----------------------------
bun add prisma --save-dev
bun add @prisma/client
```
2. lib/db.ts  
```
import { PrismaClient } from '@prisma/client'
export const prismadb = new PrismaClient()
```

3. prisma extenssion => bu extenssion prisma ile işləmək üçün istifade olunur evelceden xetalari gorsedir

4. ```bunx prisma init``` => Bu əmrlə Prisma konfiqurasiya faylı (prisma/schema.prisma) və .env faylı yaradılacaq.

Prisma ilə əlaqə yaratmaq üçün bir konfiqurasiya faylı (schema.prisma) yaratmalısınız. Bu fayl məlumat bazası bağlantı növünü və strukturlarını təyin edir.
prisma/schema.prisma faylını yaradın və məlumat bazası əlaqəsini təyin edin.
```
// prisma/schema.prisma
datasource db {
  provider = "postgresql" // İstədiyiniz məlumat bazası növünü seçə bilərsiniz (PostgreSQL, MySQL, SQLite və s.)
  url      = env("DATABASE_URL") // Ətraf mühit dəyişəni vasitəsilə məlumat bazası URL-ni təyin edin
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int    @id @default(autoincrement())
  email     String @unique
  name      String
  password  String
  posts     Post[]
}
```
DATABASE_URL: Bu dəyişən, məlumat bazası serverinizin URL-si və istifadəçi məlumatlarını saxlayır. 

### Prisma Client İstifadəsi
@prisma/client paketini layihənizə daxil etdikdən sonra, Prisma Client-ı yaratmaq və istifadə etməyə başlaya bilərsiniz. Prisma, məlumat bazasında əməliyyatları yerinə yetirmək üçündir.
Example:  pages/api/users.ts
```
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    const { name, email } = req.body
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })
    res.status(201).json(user)
  }
}

```
* ``` bun run seed``` => seed faylinda yazilan kodlar databaseye elave olacaq
5. ```bunx prisma db push | npx prisma db push``` => database push edmek
6. ```bunx prisma studio | npx prisma studio``` => http://localhost:5555/ => database userleri daxil etmek update etmek silmek kimi isleri edecek tool

7. bunx prisma studio -> etdikden sonra gedib kaytlari bir bir databazaniza elave ede bilersiz birde bizim prisma/seed.js fayli var scriptlerle bu isi eden 
bu fayli chalisdirmaliyiq ```bun prisma/seed.ts```  sonrada studio baxa bilersiz mock kaytlar olacaq