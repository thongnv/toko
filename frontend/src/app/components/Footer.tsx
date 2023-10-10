"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="hover:dark:text-violet-400"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle color="blue" />;
    case "YOUTUBE":
      return <AiFillYoutube color="red" />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  return (
    <footer className="flex flex-col justify-center bg-white mt-4">
      <div className="container p-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="flex space-x-2">
          <div className="w-64">
            <h4>Hỗ trợ khách hàng</h4>
            <div className="flex flex-col text-xs text-gray-400 pt-2 gap-1">
              <a href="#" className="hover:underline">
                Hotline: 1900-010101
              </a>
              <a href="#" className="hover:underline">
                Các câu hỏi thường gặp
              </a>
              <a href="#" className="hover:underline">
                Gửi yêu cầu hỗ trợ
              </a>
              <a href="#" className="hover:underline">
                Hướng dẫn đặt hàng
              </a>
            </div>
          </div>
          <div className="w-64">
            <h4>Về Toko</h4>
            <div className="flex flex-col text-xs text-gray-400 pt-2 gap-1">
              <a href="#" className="hover:underline">
                Giới thiệu Toko
              </a>
              <a href="#" className="hover:underline">
                Chính sách bảo mật thanh toán
              </a>
              <a href="#" className="hover:underline">
                Điều kiện vận chuyển
              </a>
              <a href="#" className="hover:underline">
                Gói hội viên VIP
              </a>
            </div>
          </div>
          <div className="w-64">
            <h4>Hợp tác và liên kết</h4>
            <div className="flex flex-col text-xs text-gray-400 pt-2 gap-1">
              <a href="#" className="hover:underline">
                Bán hàng cùng Toko
              </a>
            </div>
          </div>
          <div className="w-64">
            <h4>Phương thức thanh toán</h4>
            <div className="flex text-xs text-gray-400 pt-2 gap-1">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1329:61134"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="6"
                  width="32"
                  height="20"
                >
                  <rect
                    y="6"
                    width="32"
                    height="20"
                    rx="1.81818"
                    fill="white"
                  ></rect>
                </mask>
                <g mask="url(#mask0_1329:61134)">
                  <rect
                    opacity="0.01"
                    x="-1"
                    y="4"
                    width="34.04"
                    height="23"
                    fill="white"
                  ></rect>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.8116 10.6916L7.26655 17.2114L6.23703 11.6676C6.11637 11.0489 5.63944 10.6916 5.10955 10.6916H0.949103L0.891235 10.9696C1.74526 11.1578 2.7154 11.4606 3.30354 11.7849C3.66323 11.9827 3.76572 12.156 3.88411 12.6263L5.83384 20.2704H8.41786L12.3794 10.6916H9.8116ZM13.4285 10.6916L11.4062 20.2704H13.8514L15.8726 10.6916H13.4285ZM27.4466 13.2791L28.1868 16.8763H26.1588L27.4466 13.2791ZM27.0873 10.6916C26.6187 10.6916 26.2234 10.9688 26.0472 11.3943L22.3792 20.2704H24.945L25.4556 18.8405H28.5911L28.8876 20.2704H31.149L29.1754 10.6916H27.0873ZM16.5398 13.6828C16.5224 15.062 17.7528 15.8321 18.6794 16.2895C19.6318 16.7594 19.9514 17.0603 19.948 17.4805C19.9408 18.1229 19.1881 18.4066 18.4842 18.4177C17.2558 18.4373 16.5417 18.0815 15.9736 17.8128L15.5311 19.9112C16.1007 20.1776 17.1555 20.4095 18.2497 20.4199C20.8175 20.4199 22.4972 19.1353 22.5063 17.1431C22.5165 14.6154 19.0565 14.4755 19.0799 13.3455C19.0883 13.0031 19.4109 12.6374 20.1178 12.5447C20.4676 12.4975 21.4332 12.4615 22.5282 12.9725L22.9579 10.9423C22.3693 10.725 21.6125 10.5168 20.67 10.5168C18.2531 10.5168 16.5534 11.8186 16.5398 13.6828Z"
                    fill="#1A1F71"
                  ></path>
                </g>
              </svg>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.01"
                  x="1"
                  y="6.6665"
                  width="30"
                  height="20"
                  fill="white"
                ></rect>
                <rect
                  x="12.3877"
                  y="10.1254"
                  width="7.17949"
                  height="12.9247"
                  fill="#FF5F00"
                ></rect>
                <path
                  d="M12.8434 16.5889C12.8407 14.0664 13.9964 11.6828 15.9773 10.1254C12.6131 7.47702 7.78209 7.86278 4.87927 11.0116C1.97644 14.1604 1.97644 19.0151 4.87927 22.1639C7.78209 25.3127 12.6131 25.6985 15.9773 23.0501C13.997 21.4931 12.8414 19.1106 12.8434 16.5889Z"
                  fill="#EB001B"
                ></path>
                <path
                  d="M29.2539 16.5889C29.2538 19.7358 27.46 22.6064 24.6343 23.9815C21.8087 25.3567 18.4472 24.995 15.9775 23.0501C17.9569 21.4918 19.1126 19.1096 19.1126 16.5877C19.1126 14.0659 17.9569 11.6837 15.9775 10.1254C18.4472 8.18045 21.8087 7.81875 24.6343 9.19392C27.46 10.5691 29.2538 13.4397 29.2539 16.5866V16.5889Z"
                  fill="#F79E1B"
                ></path>
              </svg>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30 10.3615C30 8.8731 28.7934 7.6665 27.305 7.6665H4.695C3.20659 7.6665 2 8.8731 2 10.3615V22.9715C2 24.4599 3.20659 25.6665 4.695 25.6665H27.305C28.7934 25.6665 30 24.4599 30 22.9715V10.3615ZM4.695 8.6665H27.305L27.4513 8.67273C28.3189 8.74688 29 9.47465 29 10.3615V22.9715L28.9938 23.1178C28.9196 23.9854 28.1919 24.6665 27.305 24.6665H4.695L4.54875 24.6603C3.6811 24.5861 3 23.8584 3 22.9715V10.3615L3.00622 10.2153C3.08037 9.3476 3.80815 8.6665 4.695 8.6665Z"
                  fill="#052E5C"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.67528 20.2746L8.14557 21.881H7L9.205 15.6665H10.4582L12.6632 21.881H11.4918L10.9621 20.2746H8.67528ZM8.93368 19.4176H10.6994L9.83377 16.7647H9.80362L8.93368 19.4176ZM15.9535 21.881V16.6054H17.8097V15.6665H12.9862V16.6054H14.8467V21.881H15.9535ZM19.5711 17.471V21.881H18.5676V15.6665H19.8553L21.7589 20.4081H21.7933L23.6968 15.6665H24.9802V21.881H23.9811V17.471H23.9509L22.1551 21.881H21.3971L19.6012 17.471H19.5711Z"
                  fill="#052E5C"
                ></path>
                <rect
                  x="22"
                  y="10.6665"
                  width="5"
                  height="3"
                  rx="1"
                  fill="#0B74E5"
                ></rect>
              </svg>
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.17957 6.6665C3.05501 6.6665 3.76471 7.37619 3.76471 8.25164V8.54886H11.6637C12.8114 8.54886 13.3324 8.8915 14.2358 10.0787L15.8465 12.3136H30.2624C31.222 12.3136 32 13.1068 32 14.0852V25.6008C32 26.5792 31.222 27.3724 30.2624 27.3724H11.1493C10.1897 27.3724 9.41174 26.5792 9.41174 25.6008V20.3498H8.03056C7.20288 20.3498 6.41436 19.9729 5.68079 19.3563C5.51511 19.217 5.35997 19.0716 5.21619 18.924L4.96562 18.652L4.906 18.5825L3.73127 18.5832C3.58119 19.3026 2.94348 19.843 2.17957 19.843H1.58514C0.709691 19.843 0 19.1333 0 18.2578V8.25164C0 7.37619 0.709691 6.6665 1.58514 6.6665H2.17957ZM3.76471 17.6423H5.3697L5.542 17.8741L5.64335 17.9969C5.66442 18.0215 5.68754 18.048 5.71264 18.0762C5.88231 18.2671 6.07526 18.4583 6.28641 18.6358C6.80818 19.0744 7.34414 19.3496 7.85956 19.4002L8.03056 19.4087H9.41174V16.7807L8.78495 16.7809C7.74476 16.7809 7.00673 16.4227 6.5663 15.8019L6.47647 15.6649C6.23717 15.2693 6.14194 14.8715 6.12188 14.4795L6.11768 14.3119H7.05885C7.05885 14.6016 7.11528 14.9025 7.28177 15.1777C7.51253 15.5592 7.9174 15.7976 8.5937 15.8346L8.78495 15.8397H10.6145L12.0877 17.1837C12.6209 17.5716 13.4146 17.5821 14.0576 17.2702C14.5588 17.0271 14.6664 16.8014 14.5092 16.6584L11.2886 13.7286L11.2941 12.5251V12.3136H14.7371L13.5291 10.6377C12.7952 9.67451 12.5004 9.48067 11.6637 9.48067H3.76471V17.6423ZM2.17957 7.45907H1.58514C1.18109 7.45907 0.847652 7.76143 0.798745 8.15223L0.79257 8.25164V18.2578C0.79257 18.6619 1.09492 18.9953 1.48572 19.0442L1.58514 19.0504H2.17957C2.58362 19.0504 2.91705 18.7481 2.96596 18.3573L2.97214 18.2578V8.25164C2.97214 7.84759 2.66978 7.51416 2.27898 7.46525L2.17957 7.45907ZM10.3529 25.5528V16.8741L11.4942 17.9124L11.6621 18.0256C12.5171 18.5551 13.5921 18.5421 14.4684 18.117C15.4765 17.628 15.9294 16.6781 15.1425 15.9622L12.1664 13.2547H30.1961C30.6725 13.2547 31.0588 13.648 31.0588 14.1332V25.5528C31.0588 26.0379 30.6725 26.4312 30.1961 26.4312H11.2157C10.7392 26.4312 10.3529 26.0379 10.3529 25.5528Z"
                  fill="#052E5C"
                ></path>
                <circle
                  cx="20.7059"
                  cy="19.843"
                  r="4.70588"
                  fill="#0B74E5"
                ></circle>
                <path
                  d="M21.5934 19.6898L20.0494 19.3178C19.8206 19.2623 19.6604 19.0838 19.6604 18.8833C19.6604 18.634 19.9006 18.4315 20.1955 18.4315H21.1605C21.3759 18.4315 21.5809 18.488 21.7521 18.593C21.8303 18.6408 21.9409 18.6252 22.0094 18.5674L22.3079 18.3155C22.3994 18.2382 22.3848 18.1121 22.2821 18.0457C21.9615 17.8381 21.5715 17.7256 21.1605 17.7256H21.1244V17.1959C21.1244 17.0984 21.0308 17.0194 20.9153 17.0194H20.497C20.3814 17.0194 20.2878 17.0984 20.2878 17.1959V17.7254H20.1955C19.3958 17.7254 18.7542 18.3055 18.8298 18.9933C18.8836 19.4822 19.3281 19.8784 19.8873 20.0129L21.3629 20.3683C21.5916 20.4239 21.7519 20.6024 21.7519 20.8029C21.7519 21.0522 21.5116 21.2547 21.2167 21.2547H20.2517C20.0363 21.2547 19.8314 21.1982 19.6601 21.0932C19.5819 21.0453 19.4714 21.061 19.4029 21.1188L19.1043 21.3707C19.0128 21.4479 19.0274 21.5739 19.1302 21.6405C19.4507 21.8481 19.8408 21.9606 20.2517 21.9606H20.2878V22.49C20.2878 22.5875 20.3814 22.6665 20.497 22.6665H20.9153C21.0308 22.6665 21.1244 22.5875 21.1244 22.49V21.9606H21.16C21.7563 21.9606 22.3189 21.6608 22.5121 21.1848C22.7775 20.5309 22.3218 19.8658 21.5934 19.6898Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="w-64">
            <h4>Kết nối với chúng tôi</h4>
            <div className="flex">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="flex items-center justify-center w-10 h-10 rounded-full text-xl text-gray-900"
                  >
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
