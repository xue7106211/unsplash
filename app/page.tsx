import { createApi } from 'unsplash-js';
import { ImageCard } from '@/components/ImageCard';
import { Random } from 'unsplash-js/dist/methods/photos/types';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

async function getPhotos() {
  try {
    const result = await unsplash.photos.getRandom({
      count: 8,
      orientation: 'landscape',
    });
    
    if (result.errors) {
      console.error('Error fetching photos:', result.errors);
      return [];
    }

    return result.response as Random[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function Home() {
  const photos = await getPhotos();

  if (!photos || photos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <p>无法加载图片，请稍后重试</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="container mx-auto py-8 px-4 max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-8">Unsplash 图片展示</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="grid grid-cols-2 gap-4">
              {[1, 2].map((index) => (
                <ImageCard
                  key={`${photo.id}-${index}`}
                  imageUrl={photo.urls.regular}
                  title={photo.alt_description || 'Untitled'}
                  photographer={photo.user.name}
                  fullImageUrl={photo.urls.full}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
