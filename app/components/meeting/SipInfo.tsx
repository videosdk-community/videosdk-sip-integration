'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SipInfoProps {
  meetingId: string;
}

export default function SipInfo({ meetingId }: SipInfoProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'The SIP address has been copied to your clipboard.',
    });
  };

  return (
    <div className="mt-4 p-3 bg-gray-800 rounded-lg">
      <p className="text-sm text-gray-400 mb-2">SIP Address:</p>
      <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
        <code className="text-green-400">
          sip:{meetingId}@sip.videosdk.live
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(`sip:${meetingId}@sip.videosdk.live`)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}