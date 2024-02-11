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

function BookList({books}: {books: Book[]}) {
    const splitBooks = [{"testamentName": books[0]["testament_name"], "bookNames": books.slice(0, 39)}, {"testamentName": books[65]["testament_name"], "bookNames": books.slice(39, 66)}]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 m-4">
            {splitBooks.map((testament, index) => (
                <div className="m-4 w-72 mx-auto">
                <h3 className="text-center font-bold mb-4">{testament.testamentName}</h3>
                <ul>
                    {testament.bookNames.map((element, index) => (
                        <li className="m-2"><Button className="w-72" variant={"outline"}>{element.book_name}</Button></li>
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
            <div className="mt-4">
                <BreadcrumbWithRoutingLibrary translation={params.translation} />
            </div>
            <div>
                <BookList books={books} />
            </div>
        </div>
    )
}