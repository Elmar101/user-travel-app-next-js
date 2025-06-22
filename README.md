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
1. react-type-animation ("use client" - de istifade edilir)-> div lerin box larin cevrilmesi sayi artmasi get gel tipli isler
2. frame-mention ("use client" - de istifade edilir)-> div leri hereket eletdirmekden , translate kimi ishlerde ve sair istifade edilir 
3. anime js => ("use client" - de istifade edilir)-> "use client" - de istifade edilir
4. react-intersection-observer -> "use client" - de istifade edilir scrolling ichin
5. react-countup -> "use client" - de istifade edilir sayilarin profilinde artmasi icin
6. react-fast-marquee -> "use client" - de istifade edilir infiniti sliderler icin
7. swiper js -> slider lar icin


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

5. ```bunx prisma db push | npx prisma db push``` => database push edmek
6. ```bunx prisma studio | npx prisma studio``` => http://localhost:5555/ => database userleri daxil etmek update etmek silmek kimi isleri edecek tool

7. bunx prisma studio -> etdikden sonra gedib kaytlari bir bir databazaniza elave ede bilersiz birde bizim prisma/seed.js fayli var scriptlerle bu isi eden 
bu fayli chalisdirmaliyiq ```bun prisma/seed.ts```  sonrada studio baxa bilersiz mock kaytlar olacaq