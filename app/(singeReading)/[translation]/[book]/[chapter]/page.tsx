type Params = {
    translation: string,
    book: string,
    chapter: number
}

export default async function Page({params}: {params: Params}) {
    return (
        "boo"
    )
}