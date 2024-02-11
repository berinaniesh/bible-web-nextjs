import { API_URL } from "@/lib"
import { getCrumb } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Params = {
    translation: string
}

import Link from "next/link";
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"

type Book = {
    book_id: number,
    book: string,
    book_name: string,
    abbreviation: string,
    testament: string,
    testament_name: string
}

function BreadcrumbWithRoutingLibrary({translation} : {translation: string}) {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} className="flex items-center gap-2" href="/">
            <Home/>
            <span className="inline-block">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
        <BreadcrumbLink as={Link} className="flex items-center gap-2" href={translation}>
            <span className="inline-block font-bold">{getCrumb(translation, true)}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
}

function BookList({books, translation}: {books: Book[], translation: string}) {
    const splitBooks = [{"testamentName": books[0]["testament_name"], "bookNames": books.slice(0, 39)}, {"testamentName": books[65]["testament_name"], "bookNames": books.slice(39, 66)}]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            {splitBooks.map((testament, mainindex) => (
                <div key={mainindex} className="m-4 w-72 mx-auto">
                    <h3 className="text-center font-bold mb-4">{testament.testamentName}</h3>
                    <ul>
                        {testament.bookNames.map((element, index) => (
                            <Link key={index} href={"/" + translation + "/" + element.book.replace(" ", "-")}><li className="my-2"><Button key={index} className="w-72" variant={"outline"}>{element.book_name}</Button></li></Link>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    ) 
}

export default async function Page({ params }: {params: Params}) {
    const res = await fetch(`${API_URL}/${params.translation}/books`);
    const books = await res.json()
    return (
        <div>
            <div className="m-4">
                <BreadcrumbWithRoutingLibrary translation={params.translation} />
            </div>
            <div>
                <BookList books={books} translation={params.translation} />
            </div>
        </div>
    )
}