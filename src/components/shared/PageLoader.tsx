const PageLoader =() =>{
    return (
        <div className="flex min-h-[60vh] items-center justify-center rounded-xl bg-white p-5 shadow-sm">
            <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900">
            <p className="mt-4 text-sm font-medium text-gray-500">
            Loading page...
            </p>
            </div>
            </div>
        </div>
    )
}

export default PageLoader