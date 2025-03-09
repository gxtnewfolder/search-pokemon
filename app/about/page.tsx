import Image from 'next/image';
import Link from 'next/link';
import pokeball from '@/public/Logo.jpg';
import nextjs from '@/public/nextjs.svg';
import graphql from '@/public/graphql.png';
import tailwind from '@/public/tailwind.png';
import react from '@/public/react.png';

export const metadata = {
  title: 'About PokéSearch',
  description: 'Learn more about PokéSearch - Your ultimate Pokémon information hub',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Image
              src={pokeball}
              alt="PokéSearch Logo"
              width={64}
              height={64}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About PokéSearch</h1>
          <p className="text-lg text-gray-600">
            Your ultimate companion for exploring the world of Pokémon
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Comprehensive Search</h3>
              <p className="text-gray-600">
                Instantly search through all 151 original Pokémon with our powerful search functionality.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Detailed Information</h3>
              <p className="text-gray-600">
                Access detailed stats, types, attacks, and evolution chains for each Pokémon.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Type Filtering</h3>
              <p className="text-gray-600">
                Filter Pokémon by their types to find exactly what you're looking for.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-blue-600">Evolution Tracking</h3>
              <p className="text-gray-600">
                Follow evolution chains and discover how Pokémon evolve.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2 flex justify-center items-center"><Image src={react} alt="React" width={36} height={36}/></div>
              <h3 className="font-semibold text-gray-800">React</h3>
              <p className="text-sm text-gray-600">Frontend UI</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 flex justify-center items-center"><Image src={nextjs} alt="Next.js" width={36} height={36}/></div>
              <h3 className="font-semibold text-gray-800">Next.js</h3>
              <p className="text-sm text-gray-600">Framework</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 flex justify-center items-center"><Image src={graphql} alt="GraphQL" width={36} height={36}/></div>
              <h3 className="font-semibold text-gray-800">GraphQL</h3>
              <p className="text-sm text-gray-600">Data Query</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2 flex justify-center items-center p-2"><Image src={tailwind} alt="Tailwind" width={36} height={36} className='mx-auto'/></div>
              <h3 className="font-semibold text-gray-800">Tailwind</h3>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fun Facts</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Did you know?</span> The original 151 Pokémon were designed by a team of just 20 people at Game Freak!
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Type Fact:</span> In Generation 1, Dragon-type moves were only super effective against other Dragon-type Pokémon.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Evolution:</span> Eevee has the most possible evolution forms of any Pokémon, known as Eeveelutions!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Explore?</h2>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Searching Pokémon
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pb-8">
          <p>PokéSearch is a fan-made project and is not affiliated with Nintendo or The Pokémon Company.</p>
          <p>Pokémon and all related properties are trademarks of Nintendo.</p>
        </div>
      </div>
    </div>
  );
} 