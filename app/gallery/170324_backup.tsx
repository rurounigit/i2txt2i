"use client"

import { ImageResponse } from 'next/og';
import React, { useState, useEffect } from 'react';
import { useRouter , usePathname} from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const apiKey : string = process.env.NEXT_PUBLIC_API_TOKEN;
console.log(apiKey)

interface ImageData {
  id: number;
  url: string;
}

function ImageTable({images, currentPage}: {currentPage: number, images: ImageData[]}) { 
  return (
    <div className="grid grid-cols-3 gap-1 md:grid-cols-5 bg-gray-600">
      {images.map((image) => (
        <div key={image.id} className="bg-gray-800 rounded p-1">
          <a href={image.url} target="_blank" rel="noopener noreferrer">
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className= "rounded object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
}

const MainTable: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter();

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1

  function changeCurrentPage (page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(pathname + `?${params.toString()}`)
  }

  useEffect(() => {
    
    const fetchRequest = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=cow&per_page=15&client_id=${apiKey}`
      );
      const data = await response.json();
      const images = data.results.map((image: any) => ({
        id: image.id,
        url: image.urls.raw + "&max-w=600&max-h=600&crop=entropy&fit=crop"
      }));
      setImages(images);
    };
    fetchRequest();
  }, [currentPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal border-0 border-green-800">
      <div className='m-5 group rounded-full border border-black px-3 py-2 bg-gray-200'>
        <label className='p-1'>page:</label>
        <input className='w-9 mr-2'type="number" value={currentPage} onChange={(e) => changeCurrentPage(Number(e.target.value))} />
      </div>
      <ImageTable images={images} currentPage={currentPage}/>
      <div>{`page ${currentPage}`}</div>
    </main>
  );
};

export default MainTable;
