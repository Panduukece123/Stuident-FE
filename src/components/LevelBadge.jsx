import React from 'react';
import { 
  Baby, 
  Rocket, 
  Trophy, 
  Crown,
  CircleQuestionMarkIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LevelBadge = ({ level, showIcon = true }) => {
  // Normalize level
  const normalizedLevel = level?.toLowerCase() || 'beginner';
  
  // Configuration for each level
  const configs = {
    beginner: {
      label: 'Pemula',
      icon: <Baby size={16} className="mr-2" />,
      className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-50'
    },
    intermediate: {
      label: 'Menengah',
      icon: <Rocket size={16} className="mr-2" />,
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50'
    },
    advanced: {
      label: 'Mahir',
      icon: <Trophy size={16} className="mr-2" />,
      className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-50'
    },
    unknown: {
      label: 'Belum Disetel',
      icon: <CircleQuestionMarkIcon size={16} />,
      className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50'
    }
  };
  
  // Get config or default to beginner
  const config = configs[normalizedLevel] || configs.unknown;
  
  return (
    <Badge 
      variant="default"
      className={`${config.className}`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};

export default LevelBadge;