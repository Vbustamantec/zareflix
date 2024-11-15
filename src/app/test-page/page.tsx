// pages/test/page.tsx
import { APITestPanel } from "@/components/APITestPanel/APITestPanel";

export default function TestPage() {
	return (
		<div className="min-h-screen bg-black py-8">
			<div className="container mx-auto px-4">
				<header className="mb-8">
					<h1 className="text-3xl text-white font-bold">
						API Test Environment
					</h1>
					<p className="text-gray-400 mt-2">
						Test and debug API endpoints and authentication flows
					</p>
				</header>

				{/* Main Panel */}
				<main className="grid gap-8">
					{/* Testing Panel */}
					<div className="bg-dark-gray rounded-lg shadow-xl">
						<APITestPanel />
					</div>

					{/* Documentation Section */}
					<section className="bg-dark-gray rounded-lg p-6">
						<h2 className="text-xl text-white font-bold mb-4">
							Endpoints Documentation
						</h2>
						<div className="space-y-4 text-gray-300">
							<div>
								<h3 className="font-semibold text-white">
									GET /services/private
								</h3>
								<p>Tests protected route access with JWT authentication</p>
							</div>
							<div>
								<h3 className="font-semibold text-white">
									POST /services/sync
								</h3>
								<p>Synchronizes Auth0 user data with database</p>
							</div>
							<div>
								<h3 className="font-semibold text-white">
									GET /services/user/me
								</h3>
								<p>Retrieves current user data from database</p>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
