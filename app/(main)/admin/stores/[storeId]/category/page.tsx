
export default function CategoryPage({ params }: { params: { storeId: string } }) {

    const { storeId } = params

    console.log(storeId)
    return <div>
       categories
    </div>;
}