<main class="flex flex-col items-center justify-center min-h-screen">
  <h1 class="text-4xl font-bold mb-4">Login</h1>
  <form class="w-full max-w-sm">
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        type="email"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        type="password"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
    </div>
    <div>
      No account? <a href="/register" class="text-blue-500">Register</a>
    </div>
    <div class="mb-4 text-red-500"></div>
    <button
      type="button"
      class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >Login</button
    >
    <button
      type="button"
      class="w-full my-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 disabled:bg-gray-400"
      onclick={() => (window.location.href = "/")}>Go back to Home</button
    >
  </form>
</main>
