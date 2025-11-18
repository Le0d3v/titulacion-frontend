export default function PDFViewer({ url }) {
  return (
    <div className="p-1 bg-gray-300 rounded">
      <iframe src={url} width="100%" height="275px" title="PDF Viewer" />
    </div>
  );
}
