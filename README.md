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

