import { useState } from "react";
import axios from "axios";
import {
  Link2,
  Scissors,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const res = await axios.post("http://localhost:5000/api/url/shorten", {
        longUrl: longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(
        "Error generating short URL. Please make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-8 text-center">
          <div className="flex justify-center items-center space-x-3 text-white mb-2">
            <Scissors size={32} />
            <h1 className="text-3xl font-bold tracking-tight">URL Shortener</h1>
          </div>
          <p className="text-blue-100">
            Paste your long link below to make it short and sweet.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                required
                placeholder="https://example.com/very/long/link..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-center p-4 text-red-800 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Success Result */}
          {shortUrl && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Your short link is ready
              </h3>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline flex items-center truncate mr-4"
                >
                  {shortUrl}
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-sm px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1 text-green-600" />
                      <span className="text-green-600 font-medium">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
