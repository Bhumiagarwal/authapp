export default async function UserProfile({ params }: any) {
     const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">
        Profile Page
        <span className="p-2 ml-2 rounded bg-orange-500 text-white">
          {id}
        </span>
      </h1>

      <hr className="w-full max-w-md my-4 border-gray-300" />

      <p className="text-gray-600">
        Viewing detailed data for user ID: {id}
      </p>
    </div>
  );
}
