import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useImageSearch from '../Utils/useImageSearch.js';



interface Photo {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

/**
 * Search component for displaying and searching images.
 *
 * @component
 */

const Search: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const perPage = 20;
  const currentPage = 1;
  const images = useImageSearch(searchText, setSearchText, perPage, currentPage);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const navigate = useNavigate();


  /**
   * Handles the key press event for the search input.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The key press event.
   */
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchText(searchText);
    }

  };
  /**
     * Handles the click event for an image.
     *
     * @param {string} id - The ID of the clicked image.
     */

  const handleImageClick = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  /**
   * Constructs the image URL based on ID, server, and secret.
   *
   * @param {string} id - The ID of the image.
   * @param {string} server - The server hosting the image.
   * @param {string} secret - The secret key for the image.
   * @returns {string} The constructed image URL.
   */

  const constructImageUrl = (id: string, server: any, secret: any) => {
    const imageSizeSuffix = 'w';
    return `https://live.staticflickr.com/${server}/${id}_${secret}_${imageSizeSuffix}.jpg`;
  };

  /**
  * Handles the click event for the "Show Gallery" button.
  * Navigates to the gallery page with selected images.
  */

  const handleShowGallery = () => {
    console.log("Show Gallery button clicked! Selected images:", selectedImages);
    const selectedImageObjects = selectedImages.map((imageId) => {
      const { server, secret } = images?.find((image) => image.id === imageId) || {};
      return {
        id: imageId,
        imageUrl: constructImageUrl(imageId, server, secret),
      };
      console.log(images);

      // console.log(images?.find((image) => image.id === imageId) )
    });

    navigate('/gallery', { state: { selectedImageObjects } });
    console.log("selectedImages", selectedImageObjects);

  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">

        <input
          type="text"
          placeholder="🔍 Search for images"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-gray-900 mx-[650px] my-24 px-5 py-5 text-3xl border-b border-gray-500 focus:outline-none flex-grow text-center sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/2"

        />


      </div>
      {/* Display images */}
      <div className='flex flex-wrap justify-center mt-4'>
        {images && images.map((image) => {
          const { id, secret, server, title } = image;
          const imageSizeSuffix = 'w';
          const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_${imageSizeSuffix}.jpg`;

          return (


            <img
              key={id}
              src={imageUrl}
              alt={title}
              className="w-full max-w-[400px] h-[250px] object-cover m-2 shadow-lg cursor-pointer"
              onClick={() => handleImageClick(id)}
            />


          );
        })}

      </div>
      <div className="flex items-center">
        <button onClick={handleShowGallery} className=" my-6 px-4 py-3 bg-gray-400 text-white text-2xl rounded-full">
          Show Gallery
        </button>
      </div>
    </div>
  )
}

export default Search;