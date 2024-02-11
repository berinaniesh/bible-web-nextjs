import { API_URL } from "@/lib";
import { getNav } from "@/lib/utils";
import { getCrumb } from "@/lib/utils";
import Link from "next/link";
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";

type Params = {
    translation: string,
    book: string
}

async function getChapterCount(book: string) {
    const res1 = await fetch(`${API_URL}/chaptercount/${book}`)
    const countRes = await res1.json()
    const count = countRes["count"]
    const chapters = []
    for (let i=1; i<=count; i++) {
        chapters.push(i)
    }
    return chapters;
}

function BreadcrumbWithRoutingLibrary({translation, book} : {translation: string, book: string}) {
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
            <span className="inline-block font-bold">{book}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
}

export async function getBookDetails(translation: string, book: string) {
    const res = await fetch(`${API_URL}/${translation}/books`)
    const books = await res.json()
    //@ts-ignore
    const bookToReturn = books.find(obj => obj["book"] === book); 
    return bookToReturn;
}

export default async function Page({ params }: { params: Params }) {
    const book = params.book.replace("-", " ");
    const promises = [getChapterCount(book), getNav(book, 0), getBookDetails(params.translation, book)];
    const [chapters, nav, bookStruct] = await Promise.all(promises);
    return (
        <div>
            <div className="m-4">
                <BreadcrumbWithRoutingLibrary translation={params.translation} book={book}/>
            </div>
            <div className="m-4 mt-8 font-bold text-center">
                {bookStruct.book_name}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 w-2/3 gap-3 mx-auto my-6">
                {chapters.map((element: string, index: number) => (
                    <Link key={index} href={"/" + params.translation + "/" + params.book + "/" + element}><Button key={index} variant="outline" className="w-12">{element}</Button></Link>
                ))}
            </div>
        </div>
    )
}