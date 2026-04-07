const PageLoader =() =>{
    return (
        <div className="flex min-h-[60vh] items-center justify-center rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-2xl">
            <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-gray-100">
            <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading page...
            </p>
            </div>
            </div>
        </div>
    )
}

export default PageLoader
