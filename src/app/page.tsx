"use client";

import Image from "next/image";
import "./globals.css";

import { FaEye, FaHeart } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { getPhotos } from "../services/unsplash";
import { UnsplashPhoto } from "../../types";

export default function Home() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos();
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="bg-gray-100  min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {photos?.map(({ id, urls, alt_description, user, likes }) => (
            <div
              key={id}
              className="bg-white rounded-lg  overflow-hidden shadow-lg"
            >
              <Image
                className="w-full h-48 object-cover cursor-pointer"
                width={500}
                height={500}
                src={urls.small}
                alt={alt_description}
              />

              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={user.profile_image.small}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="font-semibold text-sm">{user.name}</div>
                </div>

                <div className="flex items-center">
                  <FaHeart className="text-gray-500 ml-4 mr-2" />
                  <span className="text-gray-500 text-sm mr-2">{likes}</span>
                  <FaEye className="text-gray-500 mr-2" />
                  <span className="text-gray-500 text-sm">N/A</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
