import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Segmented control to switch between annual and project modes.
 * @param {{mode: 'annual'|'project', onChange: (mode:'annual'|'project')=>void}} props
 */
export default function ModeToggle({ mode, onChange }) {
  return (
    <Tabs value={mode} onValueChange={onChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="annual" className="w-full">
          Modo Anual
        </TabsTrigger>
        <TabsTrigger value="project" className="w-full">
          Modo Proyecto
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
