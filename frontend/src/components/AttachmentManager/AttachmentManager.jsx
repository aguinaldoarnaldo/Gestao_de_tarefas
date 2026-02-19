import React, { useState, useEffect } from 'react';
import { Upload, X, Download, FileText, Image, File, Loader2 } from 'lucide-react';
import apiService from '../../services/api';
import {
  ManagerContainer,
  LoadingText,
  UploadArea,
  UploadLabel,
  Spinner,
  AttachmentsList,
  AttachmentItem,
  AttachmentIcon,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  AttachmentActions,
  ActionButton
} from './AttachmentManager.styles';

const AttachmentManager = ({ taskId }) => {
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskId) {
      fetchAttachments();
    }
  }, [taskId]);

  const fetchAttachments = async () => {
    try {
      const data = await apiService.getTaskAttachments(taskId);
      setAttachments(data);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    await uploadFiles(files);
  };

  const handleFileInput = async (e) => {
    const files = [...e.target.files];
    await uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    try {
      for (const file of files) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert(`Arquivo ${file.name} é muito grande. Máximo: 10MB`);
          continue;
        }
        await apiService.uploadAttachment(taskId, file);
      }
      await fetchAttachments();
    } catch (error) {
      alert('Erro ao fazer upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (attachmentId) => {
    if (!confirm('Deseja excluir este anexo?')) return;

    try {
      await apiService.deleteAttachment(attachmentId);
      await fetchAttachments();
    } catch (error) {
      alert('Erro ao excluir anexo: ' + error.message);
    }
  };

  const handleDownload = async (attachment) => {
    try {
      const blob = await apiService.downloadAttachment(attachment.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.nome_arquivo;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Erro ao baixar anexo: ' + error.message);
    }
  };

  const getFileIcon = (tipo) => {
    if (tipo?.startsWith('image/')) return <Image size={20} />;
    if (tipo?.includes('pdf')) return <FileText size={20} />;
    return <File size={20} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return <LoadingText>Carregando anexos...</LoadingText>;
  }

  return (
    <ManagerContainer>
      <UploadArea
        dragActive={dragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-input"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        <UploadLabel htmlFor="file-input">
          {uploading ? (
            <>
              <Spinner>
                <Loader2 size={24} />
              </Spinner>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <span>Arraste arquivos ou clique para selecionar</span>
              <small>Máximo 10MB por arquivo</small>
            </>
          )}
        </UploadLabel>
      </UploadArea>

      {attachments.length > 0 && (
        <AttachmentsList>
          {attachments.map(attachment => (
            <AttachmentItem key={attachment.id}>
              <AttachmentIcon>
                {getFileIcon(attachment.tipo_arquivo)}
              </AttachmentIcon>
              <AttachmentInfo>
                <AttachmentName title={attachment.nome_arquivo}>
                  {attachment.nome_arquivo}
                </AttachmentName>
                <AttachmentSize>{formatFileSize(attachment.tamanho_arquivo)}</AttachmentSize>
              </AttachmentInfo>
              <AttachmentActions>
                <ActionButton
                  onClick={() => handleDownload(attachment)}
                  title="Baixar"
                >
                  <Download size={16} />
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(attachment.id)}
                  title="Excluir"
                >
                  <X size={16} />
                </ActionButton>
              </AttachmentActions>
            </AttachmentItem>
          ))}
        </AttachmentsList>
      )}
    </ManagerContainer>
  );
};

export default AttachmentManager;
