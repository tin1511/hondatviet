import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Plus, 
  FileText, 
  Check, 
  AlertCircle,
  Share2,
  Image as ImageIcon
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { CommunityContribution } from '../types';

export const CommunityContributionModule: React.FC = () => {
  const [contributions, setContributions] = useState<CommunityContribution[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [contributorName, setContributorName] = useState<string>('');
  const [location, setLocation] = useState<string>('Thừa Thiên Huế');
  const [category, setCategory] = useState<string>('custom_folklore');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80');
  const [sourceReference, setSourceReference] = useState<string>('Truyền thuyết các vị bô lão làng Dạ Lê Thượng kể lại');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setContributions(storageService.getCommunityContributions());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !agreedTerms) {
      alert('Vui lòng điền đầy đủ thông tin và đồng ý điều khoản đóng góp.');
      return;
    }

    const newContrib = storageService.saveCommunityContribution({
      userId: 'user-' + Date.now(),
      contributorName: contributorName || 'Người yêu văn hóa ẩn danh',
      title,
      category: category as any,
      location,
      content,
      imageUrl,
      sourceReference,
      status: 'pending_review',
      likesCount: 1
    });

    setContributions([newContrib, ...contributions]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setTitle('');
      setContent('');
    }, 2000);
  };

  const handleLike = (id: string) => {
    setContributions(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, likesCount: (c.likesCount || 0) + 1 };
      }
      return c;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Kho Dữ Liệu Văn Hóa Mở Cho Cộng Đồng</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Chung Tay Đóng Góp Tri Thức Di Sản
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Mỗi câu chuyện truyền khẩu, một công thức nấu ăn cổ hay một bức ảnh di tích xưa từ bạn đều là mảnh ghép vô giá cho kho tàng văn hóa Việt Nam.
        </p>
      </div>

      {/* CTA Button to Open Form */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xl flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Đóng form đóng góp' : 'Gửi Đóng Góp Tư Liệu Mới'}</span>
        </button>
      </div>

      {/* Contribution Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-w-3xl mx-auto mb-12 animate-fadeIn"
        >
          <div className="border-b border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-amber-200 text-lg">
              Phiếu Đóng Góp Tư Liệu Văn Hóa
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Thông tin sẽ được đối chiếu và kiểm duyệt trước khi đưa vào kho dữ liệu chính thức.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Tên người đóng góp:</label>
              <input
                type="text"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Hoàng Nam / Ký ức Sài Gòn"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Địa phương / Tỉnh thành:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Chủ đề đóng góp:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="custom_folklore">Huyền tích & Phong tục dân gian</option>
                <option value="monument">Di tích / Công trình chưa được ghi danh</option>
                <option value="recipe">Món ăn truyền thống / Công thức cổ</option>
                <option value="craft">Làng nghề thủ công gia truyền</option>
                <option value="photo_history">Ảnh tư liệu lịch sử</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold">Nguồn tư liệu / Nhân chứng:</label>
              <input
                type="text"
                value={sourceReference}
                onChange={(e) => setSourceReference(e.target.value)}
                placeholder="Ví dụ: Lời kể cụ cố, Gia phả họ Trần..."
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1 font-semibold">Tiêu đề tư liệu / Câu chuyện:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Sự tích Đồi Vọng Cảnh và cây đa 300 tuổi làng Dạ Lê"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1 font-semibold">Nội dung chi tiết tư liệu:</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Mô tả chi tiết câu chuyện, ý nghĩa văn hóa, cách chế tác hoặc các dị bản dân gian..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1 font-semibold">Đường dẫn hình ảnh (Ảnh thực tế/Tư liệu):</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-xs text-stone-300 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="rounded mt-0.5 text-amber-500 focus:ring-amber-500"
              required
            />
            <span>
              Tôi cam kết thông tin cung cấp chính xác, không vi phạm bản quyền hay thuần phong mỹ tục và đồng ý đóng góp cho kho tri thức mở HERITAGEAI.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitted || !agreedTerms}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                <span>Đã gửi thành công! Cảm ơn đóng góp của bạn.</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Gửi Tư Liệu Để Kiểm Định</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Community Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="font-serif font-bold text-amber-100 text-lg sm:text-xl">
            Các Đóng Góp Mới Từ Cộng Đồng ({contributions.length})
          </h3>
          <span className="text-xs text-stone-400">Đã kiểm duyệt & Xác thực nguồn gốc</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributions.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                {item.imageUrl && (
                  <div className="h-44 w-full overflow-hidden bg-stone-950 relative">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-black/70 text-amber-300 backdrop-blur border border-amber-500/30 font-semibold">
                        {item.location}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">
                      Người đóng góp: <strong className="text-stone-200">{item.contributorName}</strong>
                    </span>
                    {item.status === 'verified' ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Đã kiểm định
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Đang chờ duyệt
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-stone-100 text-base">
                    {item.title}
                  </h4>

                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {item.content}
                  </p>

                  {item.sourceReference && (
                    <p className="text-[11px] text-stone-500 italic pt-1">
                      📚 Nguồn: {item.sourceReference}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-800/60 text-xs text-stone-400">
                <span className="text-[11px]">{new Date(item.createdAt || item.submittedAt || Date.now()).toLocaleDateString('vi-VN')}</span>

                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-red-400 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                  <span>{item.likesCount || 0} Yêu thích</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
