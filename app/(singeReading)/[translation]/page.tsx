import { API_URL } from "@/lib"

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

function BreadcrumbWithRoutingLibrary({translation}) {
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
            <span className="inline-block font-bold">{translation.toUpperCase()}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
  }

export default async function Page({ params }) {
    const res = await fetch(`${API_URL}/${params.translation}/books`);
    const books = await res.json()
    const translation = params.translation
    return (
        <div className="my-4">
            <BreadcrumbWithRoutingLibrary translation={params.translation} />
        </div>
    )
}