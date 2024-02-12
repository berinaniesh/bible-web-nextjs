import { getNav } from "@/lib/utils";
import { getCrumb } from "@/lib/utils";
import Link from "next/link";
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { API_URL } from "@/lib";


type Params = {
    translation: string,
    book: string,
    chapter: number
}

type Verse = {
    verse_number: number,
    verse: string
}

async function getBookDetails(translation: string, book: string) {
  const res = await fetch(`${API_URL}/${translation}/books`)
  const books = await res.json()
  //@ts-ignore
  const bookToReturn = books.find(obj => obj["book"] === book); 
  return bookToReturn;
}

function BreadcrumbWithRoutingLibrary({translation, book, chapter} : {translation: string, book: string, chapter: number}) {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} className="flex items-center gap-2" href="/">
            <Home/>
            <span className="inline-block">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
        <BreadcrumbLink as={Link} className="flex items-center gap-2" href={"/" + translation}>
            <span className="inline-block">{getCrumb(translation, true)}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
        <BreadcrumbLink as={Link} className="flex items-center gap-2" href={"/" + translation + "/" + book}>
            <span className="inline-block">{book}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
        <BreadcrumbLink as={Link} className="flex items-center gap-2" href={"/" + translation + "/" + book + "/" + chapter}>
            <span className="inline-block font-bold">{chapter}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
}

async function getVerses(translation: string, book: string, chapter: number) {
    const res = await fetch(`${API_URL}/verses?translation=${translation}&book=${book}&chapter=${chapter}`)
    const verses = await res.json()
    return verses;
}

export default async function Page({params}: {params: Params}) {
    const book = params.book.replace("-", " ");
    const promises = [getNav(book, params.chapter), getBookDetails(params.translation, book), getVerses(params.translation, book, params.chapter)];
    const [nav, bookStruct, verses] = await Promise.all(promises);
    return (
        <div>
            <div className="m-4">
                <BreadcrumbWithRoutingLibrary translation={params.translation} book={book} chapter={params.chapter}/>
            </div>
            <div className="m-4 mt-8 mb-6 font-bold text-center">
                {bookStruct.book_name} {params.chapter}
            </div>
            <div>
                {verses.map((verse: Verse, index: number) => (
                    <p key={index} className="m-4 leading-loose"><sup>{verse.verse_number}</sup> {verse.verse}</p>
                ))}
            </div>
        </div>
    )
}