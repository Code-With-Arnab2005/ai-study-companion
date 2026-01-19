'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AiSessonHeader from '@/components/ai-sessions/AiSessionHeader';
import GenerateNotes from '@/components/ai-sessions/GenerateNotes';

export default function ModeClient() {
  const [topic, setTopic] = useState('');
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'docs') setTopic('Ask With Documents');
    else if (mode === 'subject') setTopic('Ask with Subject');
    else if (mode === 'ai-tutor') setTopic('Learn with AI tutor');
    else setTopic('Generate Notes with AI Agent');
  }, [mode]);

  return (
    <>
      <AiSessonHeader header={topic} desc="" />
      {mode === 'generate-notes' && <GenerateNotes />}
    </>
  );
}
