// hooks/useEditable.ts
import { useState } from 'react';

export const useEditable = (
  initialTitle: string,
  initialNotes: string,
  onUpdate: (data: { title: string; personalNotes: string }) => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editData, setEditData] = useState({
    title: initialTitle,
    notes: initialNotes
  });

  const handleSave = () => {
    onUpdate({
      title: editData.title,
      personalNotes: editData.notes
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: initialTitle,
      notes: initialNotes
    });
    setIsEditing(false);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const startEditing = () => setIsEditing(true);

  return {
    isEditing,
    isExpanded,
    editData,
    setEditData,
    handleSave,
    handleCancel,
    toggleExpand,
    startEditing
  };
};