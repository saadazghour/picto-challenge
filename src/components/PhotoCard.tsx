import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";
import { UnsplashPhoto } from "../../types";

interface PhotoCardProps {
  photo: UnsplashPhoto;
  isLiked: any;
  onLike: (id: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onLike, isLiked }) => {
  const { id, urls, alt_description, user, likes } = photo;

  return (
    <div key={id} className="bg-white rounded-lg overflow-hidden shadow-lg">
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
          <button onClick={() => onLike(photo.id)}>
            {isLiked ? (
              <FaHeart className="text-red-500 ml-4 mr-2" />
            ) : (
              <FaHeart className="text-gray-500 mr-2" />
            )}
          </button>

          <span className="text-gray-500 text-sm mr-2">{likes}</span>
          <FaEye className="text-gray-500 mr-2" />
          <span className="text-gray-500 text-sm">N/A</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
