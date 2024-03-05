import React, { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { APP_KEY, API_URL } from '../Utils/constants.js';
import useDebounce from './useDebounce.js';

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
interface ApiResponse {
    photos: {
        page: number;
        pages: number;
        perpage: number;
        total: number;
        photo: Photo[];
    };
    stat: string;
}


const useImageSearch = (searchText: string, setSearchText: Dispatch<SetStateAction<string>>, perPage: number,
    currentPage: number
): Photo[] | undefined => {
    const debouncedSearchText = useDebounce(searchText, 600);
    const [images, setImages] = useState<Photo[]>();

    useEffect(() => {

        const fetchData = async (debouncedSearchText: string) => {
            if (debouncedSearchText.trim() !== '') {
                console.log(debouncedSearchText.trim());
                try {


                    const apiKey = encodeURIComponent(APP_KEY);
                    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${debouncedSearchText}&format=json&nojsoncallback=1&page=${currentPage}&per_page=${perPage}`;

                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} - ${response.statusText}`);
                    }

                    const json: ApiResponse = await response.json();
                    setImages(json.photos.photo)

                } catch (error) {
                    console.error('Error fetching data:', error);
                }

            }


        };
        fetchData(debouncedSearchText);

        return () => {
            setSearchText('');
        };
    }, [debouncedSearchText, setSearchText])
    return images;


}

export default useImageSearch;