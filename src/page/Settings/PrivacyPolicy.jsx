import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Navigate } from '../../Navigate';
import { useGetPrivecyQuery, useUpdatePrivecyMutation } from '../redux/api/manageApi';

const PrivacyPolicy = () => {
  const { data: privecyData } = useGetPrivecyQuery();
  const [updatePrivecy] = useUpdatePrivecyMutation();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [id, setId] = useState(null); // update korar jonno id
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (privecyData?.data?.length > 0) {
      // first item niye ashi
      setContent(privecyData.data[0].content || '');
      setId(privecyData.data[0].id);
    }
  }, [privecyData]);

  const handleUpdate = async () => {
    const data = {
      content,
     
    }
    if (!id) return message.error("No privacy policy found to update.");
    setLoading(true);

    try {
      const res = await updatePrivecy({ id, data }).unwrap(); // id o content pathai
      message.success(res?.message );
    } catch (error) {
      console.error(error);
      message.error("Update failed!");
    }
    setLoading(false);
  };

  const config = {
    readonly: false,
    placeholder: 'Start typing...',
    style: { height: 600 },
    buttons: ['image', 'fontsize', 'bold', 'italic', 'underline', '|', 'font', 'brush', 'align'],
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between">
        <Navigate title="Privacy & Policy" />
      </div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        onChange={() => {}}
      />
      <div className="mt-5 flex justify-center">
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-[#212121] py-2 px-4 rounded text-white"
        >
          {isLoading ? <Spin size="small" /> : "Update"}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
