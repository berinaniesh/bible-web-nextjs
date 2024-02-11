import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { API_URL } from '@/lib';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button";

type Translation = {
  name: string,
  language: string,
  full_name: string,
  year: number,
  license: string,
  description: string
}

const footerElements = [{"key": "about", "text": "About"}, {"key": "alternate-uis", "text": "Alternate UIs"}, {"key": "changelog", "text": "Changelog"}, {"key": "source", "text": "Source"}]

async function getTranslations() {
  const res = await fetch(`${API_URL}/translations`);
  const translations = await res.json();
  return translations
}

export function BreadcrumbWithRoutingLibrary() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} className="flex items-center gap-2" href="/">
          <Home/>
          <span className="inline-block font-bold">Home</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

function Title() {
  return (
    <div className="text-3xl font-bold">
      The Bible
    </div>
  )
}

function Footer() {
  return (
    <div>
      <ul className="flex text-slate-500">
        {footerElements.map((element, index) => (
          <Link href={"/" + element.key}><li className="mx-4 hover:underline" key={index}>{element.text}</li></Link>
        ))}
      </ul>
    </div>
  )
}

function cardWithTranslation(translation: Translation) {
  return (
    <Card className="bg-[url('/greentexture.avif')]">
      <CardHeader>
        <CardTitle><Link href={`/${translation.name}`}>{translation.name}</Link></CardTitle>
        <CardDescription>{translation.full_name}</CardDescription>
      </CardHeader>
      <CardContent>
        {translation.language}
      </CardContent>
      <CardFooter className="flex justify-between">
        {translation.year}
        <Link href={"/" + translation.name}><Button>Read</Button></Link>
      </CardFooter>
    </Card>
  )

}

export default async function HomePage() {
  const translations = await getTranslations();
  return (
    <div>
      <div className="my-4">
        <BreadcrumbWithRoutingLibrary></BreadcrumbWithRoutingLibrary>
      </div>
      <div className="mt-8 mb-4">
      <Title></Title>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {translations.map((translation: Translation, index: number) => (
          <div key={index} className="m-4 w-80">{cardWithTranslation(translation)}</div>
        ))}
      </div>
      <div className="my-8 mx-auto md:w-7/12">
        <Footer></Footer>
      </div>
    </div>
  )
}