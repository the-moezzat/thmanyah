import { cn } from '@repo/design-system/lib/utils';
import Image from 'next/image';

const colors = [
  'text-blue-400',
  'text-green-400',
  'text-yellow-400',
  'text-pink-400',
];

function ResultItem({ title, author }: { title: string; author: string }) {
  const selectedColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className=" shrink-0 grow space-y-2">
      <Image
        src={
          'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/fa/cf/81/facf8123-54f3-caeb-8779-dc090bad60c1/mza_3145696609880249843.jpg/300x300bb.jpg'
        }
        width={230}
        height={230}
        className="aspect-square w-full min-w-40 max-w-60 rounded-sm object-cover"
        alt="podcast cover"
      />
      <div>
        <h3 className="truncate font-medium text-lg">{title}</h3>
        <p className={cn(selectedColor)}>{author}</p>
      </div>
    </div>
  );
}

export default ResultItem;
