
function isValidToken(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function LandingPage() {
  const token = localStorage.getItem('token');
  const loggedIn = isValidToken(token);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <h1 className="text-4xl font-bold mb-4 text-slate-900">Welcome to Inventory App</h1>
      <p className="text-xl text-slate-700 mb-8 text-center max-w-2xl font-semibold">
        Track smarter, not harder – simplify your inventory in seconds
      </p>
      {!loggedIn && (
        <div className="flex gap-4">
          <a href="/login" className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-700 transition">Login</a>
          <a href="/register" className="px-6 py-2 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition">Register</a>
        </div>
      )}
    </div>
  );
} 