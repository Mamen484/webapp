import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sft-logo',
    template: `
        <svg width="137" height="25" viewBox="0 0 137 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <path d="M32.9902 13.8043C32.677 13.5882 32.3243 13.4112 31.932 13.2731C31.5398 13.1351 31.1416 13.0075 30.7367 12.889C30.384 12.7847 30.0372 12.6759 29.6979 12.5642C29.3579 12.4531 29.0611 12.3248 28.8061 12.1808C28.5511 12.0367 28.346 11.8627 28.1886 11.6594C28.0321 11.4561 27.9538 11.2167 27.9538 10.9414V10.9016C27.9538 10.4035 28.1596 9.98711 28.5712 9.6525C28.9828 9.3179 29.5346 9.1506 30.2266 9.1506C30.762 9.1506 31.2945 9.24288 31.8239 9.42668C32.3533 9.61124 32.8462 9.85432 33.3033 10.1559L33.8134 9.34791C33.3168 9.0013 32.7515 8.72822 32.1184 8.5264C31.4846 8.32534 30.8672 8.22406 30.2669 8.22406C29.7829 8.22406 29.3392 8.29308 28.9343 8.43037C28.5294 8.56842 28.1827 8.76123 27.8956 9.01105C27.6078 9.26013 27.3826 9.55197 27.22 9.88658C27.0559 10.2212 26.9747 10.591 26.9747 10.9977V11.0374C26.9747 11.4831 27.0761 11.8574 27.2782 12.159C27.4802 12.4614 27.745 12.7135 28.0716 12.9168C28.3982 13.1201 28.7673 13.2866 29.1789 13.4187C29.5905 13.55 29.9984 13.6745 30.4034 13.7923C30.7561 13.8973 31.0894 14.0024 31.4026 14.1074C31.7158 14.2124 31.9969 14.3437 32.2452 14.5005C32.4935 14.6581 32.6889 14.8419 32.8336 15.0512C32.9767 15.2612 33.0491 15.5103 33.0491 15.7992V15.8382C33.0491 16.4286 32.8172 16.8945 32.3533 17.2351C31.8895 17.5757 31.3183 17.746 30.639 17.746C29.9984 17.746 29.378 17.6312 28.7777 17.4009C28.1767 17.1713 27.6018 16.8457 27.053 16.4249L26.4847 17.1938C27.0201 17.629 27.6532 17.9846 28.3855 18.2599C29.117 18.5353 29.8486 18.6726 30.5801 18.6726C31.0633 18.6726 31.5144 18.6035 31.932 18.4662C32.3496 18.3289 32.7157 18.1316 33.0297 17.8758C33.3429 17.62 33.5882 17.3116 33.7642 16.9508C33.9409 16.5899 34.0289 16.187 34.0289 15.7414V15.7016C34.0289 15.256 33.9342 14.8816 33.7448 14.58C33.5554 14.2799 33.3041 14.0211 32.9902 13.8043Z"
                      fill="white"/>
                <path d="M42.7468 9.34866C42.4008 8.98105 41.9788 8.69521 41.4829 8.49114C40.9863 8.28708 40.4247 8.1858 39.7976 8.1858C38.8834 8.1858 38.1385 8.38986 37.5643 8.79724C36.9893 9.20462 36.5322 9.70427 36.1922 10.2955V4.08502H35.2318V18.476H36.1922V12.6602C36.1922 12.135 36.2802 11.6519 36.4569 11.2107C36.6329 10.7704 36.8782 10.3922 37.1922 10.0771C37.5054 9.76204 37.8715 9.51521 38.2891 9.33741C38.7074 9.1596 39.1645 9.07107 39.6612 9.07107C40.6798 9.07107 41.4635 9.38317 42.0123 10.0074C42.5612 10.6316 42.8356 11.4628 42.8356 12.5011V18.4745H43.796V12.3233C43.796 11.7194 43.708 11.1635 43.5313 10.6578C43.3546 10.1537 43.0928 9.71702 42.7468 9.34866Z"
                      fill="white"/>
                <path d="M53.522 9.74327C53.0649 9.26988 52.5258 8.89251 51.9054 8.60967C51.285 8.32683 50.6026 8.18579 49.8577 8.18579C49.1128 8.18579 48.4275 8.32759 47.8003 8.60967C47.1732 8.89251 46.6274 9.27663 46.1643 9.76278C45.7005 10.2489 45.341 10.8079 45.0868 11.4388C44.8317 12.0697 44.7042 12.7397 44.7042 13.4494V13.4884C44.7042 14.1982 44.8317 14.8689 45.0868 15.4998C45.3418 16.1308 45.6975 16.6822 46.1546 17.1556C46.6117 17.629 47.1501 18.0063 47.7713 18.2892C48.3917 18.572 49.074 18.7131 49.8189 18.7131C50.5639 18.7131 51.2492 18.572 51.8763 18.2892C52.5034 18.0063 53.0485 17.6222 53.5123 17.1361C53.9762 16.6499 54.3356 16.091 54.5899 15.4601C54.8449 14.8291 54.9724 14.1591 54.9724 13.4494V13.4097C54.9724 12.6999 54.8449 12.03 54.5899 11.399C54.3356 10.7681 53.9791 10.2159 53.522 9.74327ZM53.953 13.4884C53.953 14.0774 53.8509 14.6333 53.6481 15.157C53.4445 15.6799 53.1626 16.1353 52.8017 16.5209C52.4408 16.9065 52.0075 17.2141 51.5019 17.4429C50.9964 17.6725 50.4483 17.7865 49.8577 17.7865C49.2805 17.7865 48.7384 17.6755 48.2336 17.4527C47.728 17.2306 47.2888 16.923 46.9145 16.5306C46.5409 16.1383 46.2486 15.6769 46.039 15.1465C45.8287 14.6168 45.7243 14.0504 45.7243 13.4487V13.4097C45.7243 12.8215 45.8257 12.2656 46.0293 11.7419C46.2329 11.2182 46.5148 10.7636 46.8757 10.378C47.2366 9.99235 47.6698 9.68476 48.1754 9.45519C48.6803 9.22636 49.2283 9.11158 49.8197 9.11158C50.3968 9.11158 50.9382 9.22261 51.4438 9.44543C51.9494 9.6675 52.3886 9.97585 52.7629 10.3682C53.1373 10.7606 53.4288 11.222 53.6391 11.7516C53.8494 12.2813 53.9538 12.847 53.9538 13.4494V13.4884H53.953Z"
                      fill="white"/>
                <path d="M64.2189 9.56549C63.7618 9.1191 63.2421 8.77699 62.6612 8.53992C62.0795 8.3036 61.4882 8.18506 60.8879 8.18506C60.3913 8.18506 59.9372 8.25408 59.5263 8.39212C59.1147 8.53017 58.7426 8.71097 58.4092 8.93454C58.0759 9.15811 57.7724 9.42069 57.498 9.72304C57.2236 10.0254 56.982 10.3412 56.7732 10.6691V8.42213H55.8127V21.6307H56.7732V16.3078C56.982 16.6237 57.2206 16.926 57.4883 17.2149C57.756 17.5045 58.0565 17.7603 58.3899 17.9839C58.7232 18.2074 59.0983 18.3845 59.5166 18.5165C59.9342 18.6478 60.3913 18.7138 60.8887 18.7138C61.4897 18.7138 62.0803 18.5923 62.6619 18.3492C63.2428 18.1061 63.7626 17.758 64.2197 17.3041C64.6768 16.851 65.0459 16.2988 65.3263 15.6484C65.6074 14.9979 65.7476 14.2657 65.7476 13.4502V13.4104C65.7476 12.5957 65.6067 11.8627 65.3263 11.2122C65.0452 10.561 64.676 10.0126 64.2189 9.56549ZM64.7282 13.4885C64.7282 14.1592 64.6268 14.7601 64.424 15.2928C64.2212 15.8254 63.943 16.2756 63.5896 16.6432C63.2361 17.0116 62.82 17.2936 62.3428 17.491C61.864 17.6883 61.3503 17.7865 60.8007 17.7865C60.2765 17.7865 59.7694 17.6815 59.278 17.4707C58.7866 17.2606 58.3511 16.968 57.9715 16.5937C57.5912 16.2193 57.287 15.7662 57.0581 15.2335C56.8291 14.7008 56.7143 14.1127 56.7143 13.469V13.4292C56.7143 12.7855 56.8291 12.2003 57.0581 11.6744C57.287 11.1492 57.5912 10.6953 57.9715 10.3142C58.3511 9.9331 58.7866 9.63751 59.278 9.42669C59.7686 9.21663 60.2765 9.1116 60.8007 9.1116C61.3242 9.1116 61.8253 9.21363 62.3032 9.41694C62.7812 9.621 63.2003 9.90984 63.5605 10.285C63.9207 10.6593 64.2055 11.1162 64.415 11.6549C64.6246 12.1943 64.7297 12.7915 64.7297 13.4487V13.4885H64.7282Z"
                      fill="white"/>
                <path d="M75.2978 9.56549C74.8407 9.1191 74.3209 8.77699 73.74 8.53992C73.1584 8.3036 72.567 8.18506 71.9667 8.18506C71.4701 8.18506 71.016 8.25408 70.6051 8.39212C70.1935 8.53017 69.8214 8.71097 69.4881 8.93454C69.1547 9.15811 68.8512 9.42069 68.5768 9.72304C68.3024 10.0254 68.0608 10.3412 67.852 10.6691V8.42213H66.8915V21.6307H67.852V16.3078C68.0608 16.6237 68.2994 16.926 68.5671 17.2149C68.8348 17.5045 69.1353 17.7603 69.4687 17.9839C69.802 18.2074 70.1771 18.3845 70.5954 18.5165C71.013 18.6478 71.4709 18.7138 71.9675 18.7138C72.5685 18.7138 73.1591 18.5923 73.7408 18.3492C74.3217 18.1061 74.8414 17.758 75.2985 17.3041C75.7556 16.851 76.1247 16.2988 76.4051 15.6484C76.6862 14.9979 76.8264 14.2657 76.8264 13.4502V13.4104C76.8264 12.5957 76.6855 11.8627 76.4051 11.2122C76.124 10.561 75.7556 10.0126 75.2978 9.56549ZM75.8078 13.4885C75.8078 14.1592 75.7064 14.7601 75.5036 15.2928C75.3008 15.8254 75.0226 16.2756 74.6691 16.6432C74.3157 17.0116 73.8996 17.2936 73.4223 17.491C72.9444 17.6883 72.4298 17.7865 71.8802 17.7865C71.356 17.7865 70.8489 17.6815 70.3575 17.4707C69.8661 17.2606 69.4314 16.968 69.0511 16.5937C68.6708 16.2193 68.3665 15.7662 68.1376 15.2335C67.9087 14.7008 67.7938 14.1127 67.7938 13.469V13.4292C67.7938 12.7855 67.9087 12.2003 68.1376 11.6744C68.3665 11.1492 68.6708 10.6953 69.0511 10.3142C69.4306 9.9331 69.8661 9.63751 70.3575 9.42669C70.8489 9.21663 71.356 9.1116 71.8802 9.1116C72.4037 9.1116 72.9048 9.21363 73.3828 9.41694C73.8608 9.621 74.2799 9.90984 74.6401 10.285C75.0002 10.6593 75.2851 11.1162 75.4946 11.6549C75.7042 12.1943 75.8093 12.7915 75.8093 13.4487V13.4885H75.8078Z"
                      fill="white"/>
                <path d="M79.0687 8.42212H78.1083V18.476H79.0687V8.42212Z" fill="white"/>
                <path d="M79.1858 4.47968H77.9904V5.80084H79.1858V4.47968Z" fill="white"/>
                <path d="M87.9812 9.34865C87.6352 8.98104 87.2139 8.6952 86.7173 8.49114C86.2206 8.28707 85.6591 8.18579 85.032 8.18579C84.1178 8.18579 83.3728 8.38985 82.7987 8.79723C82.2237 9.20461 81.7666 9.70426 81.4266 10.2954V8.42286H80.4661V18.4767H81.4266V12.6609C81.4266 12.1358 81.5146 11.6526 81.6913 11.2115C81.8673 10.7711 82.1126 10.393 82.4258 10.0779C82.7397 9.76278 83.1051 9.51595 83.5235 9.33815C83.941 9.16034 84.3989 9.07182 84.8948 9.07182C85.9134 9.07182 86.6979 9.38391 87.246 10.0081C87.7948 10.6323 88.0692 11.4636 88.0692 12.5019V18.4752H89.0297V12.3241C89.0297 11.7201 88.9417 11.1642 88.7649 10.6586C88.5889 10.1537 88.3272 9.71702 87.9812 9.34865Z"
                      fill="white"/>
                <path d="M114.87 9.70353C114.472 9.23088 113.992 8.85952 113.43 8.58943C112.868 8.3201 112.235 8.18506 111.529 8.18506C110.85 8.18506 110.223 8.3231 109.649 8.59919C109.074 8.87527 108.574 9.24964 108.15 9.72304C107.725 10.1964 107.392 10.7516 107.151 11.3886C106.909 12.0263 106.788 12.706 106.788 13.4292V13.469C106.788 14.2574 106.919 14.9739 107.181 15.6176C107.443 16.2621 107.8 16.8135 108.252 17.2741C108.703 17.734 109.227 18.0889 109.823 18.3387C110.419 18.5885 111.044 18.7131 111.699 18.7131C112.655 18.7131 113.456 18.5323 114.104 18.1707C114.752 17.8098 115.332 17.3529 115.841 16.8007L115.175 16.2096C114.756 16.6567 114.275 17.0311 113.731 17.3334C113.187 17.6357 112.523 17.7865 111.737 17.7865C111.239 17.7865 110.764 17.698 110.312 17.5217C109.861 17.3454 109.458 17.0866 109.104 16.7467C108.751 16.4069 108.456 15.995 108.221 15.5103C107.985 15.0264 107.847 14.4705 107.808 13.8433H116.097C116.109 13.7645 116.116 13.7023 116.116 13.6558C116.116 13.61 116.116 13.541 116.116 13.4487C116.116 12.6992 116.008 12.006 115.793 11.369C115.576 10.7321 115.268 10.1769 114.87 9.70353ZM107.806 12.976C107.845 12.4239 107.97 11.9085 108.179 11.4283C108.389 10.9489 108.654 10.5348 108.975 10.1859C109.295 9.83782 109.672 9.56474 110.104 9.36743C110.537 9.17011 111.001 9.07183 111.5 9.07183C112.076 9.07183 112.58 9.18062 113.013 9.39744C113.445 9.61425 113.808 9.90309 114.103 10.2647C114.397 10.6263 114.627 11.0404 114.79 11.5071C114.954 11.9737 115.055 12.4629 115.095 12.976H107.806Z"
                      fill="white"/>
                <path d="M124.99 9.70353C124.592 9.23088 124.111 8.85952 123.55 8.58943C122.988 8.3201 122.355 8.18506 121.649 8.18506C120.97 8.18506 120.343 8.3231 119.769 8.59919C119.194 8.87527 118.694 9.24964 118.27 9.72304C117.845 10.1964 117.512 10.7516 117.27 11.3886C117.029 12.0263 116.908 12.706 116.908 13.4292V13.469C116.908 14.2574 117.039 14.9739 117.301 15.6176C117.563 16.2621 117.919 16.8135 118.372 17.2741C118.823 17.734 119.347 18.0889 119.943 18.3387C120.539 18.5885 121.164 18.7131 121.818 18.7131C122.774 18.7131 123.576 18.5323 124.224 18.1707C124.872 17.8098 125.451 17.3529 125.961 16.8007L125.295 16.2096C124.876 16.6567 124.395 17.0311 123.85 17.3334C123.307 17.6357 122.642 17.7865 121.856 17.7865C121.358 17.7865 120.884 17.698 120.432 17.5217C119.98 17.3454 119.578 17.0866 119.224 16.7467C118.871 16.4069 118.576 15.995 118.341 15.5103C118.105 15.0264 117.967 14.4705 117.928 13.8433H126.217C126.229 13.7645 126.236 13.7023 126.236 13.6558C126.236 13.61 126.236 13.541 126.236 13.4487C126.236 12.6992 126.128 12.006 125.913 11.369C125.695 10.7321 125.388 10.1769 124.99 9.70353ZM117.926 12.976C117.965 12.4239 118.09 11.9085 118.299 11.4283C118.508 10.9489 118.774 10.5348 119.094 10.1859C119.415 9.83782 119.792 9.56474 120.224 9.36743C120.657 9.17011 121.121 9.07183 121.619 9.07183C122.196 9.07183 122.7 9.18062 123.132 9.39744C123.565 9.61425 123.928 9.90309 124.223 10.2647C124.517 10.6263 124.747 11.0404 124.91 11.5071C125.073 11.9737 125.175 12.4629 125.214 12.976H117.926Z"
                      fill="white"/>
                <path d="M136.04 4.08502V10.5903C135.831 10.2752 135.593 9.97285 135.325 9.68326C135.057 9.39442 134.757 9.13859 134.424 8.91427C134.09 8.6907 133.715 8.51365 133.297 8.38161C132.879 8.25032 132.421 8.1843 131.925 8.1843C131.324 8.1843 130.732 8.30583 130.152 8.54891C129.57 8.79274 129.051 9.14084 128.594 9.59398C128.137 10.0471 127.768 10.5993 127.487 11.2505C127.205 11.901 127.065 12.6339 127.065 13.4487V13.4877C127.065 14.3024 127.205 15.0354 127.487 15.6859C127.768 16.3363 128.136 16.8855 128.594 17.3319C129.051 17.779 129.57 18.1204 130.152 18.3567C130.732 18.5938 131.324 18.7116 131.925 18.7116C132.421 18.7116 132.876 18.6425 133.286 18.5045C133.698 18.3665 134.07 18.1857 134.403 17.9621C134.737 17.7385 135.037 17.4759 135.305 17.1736C135.573 16.8712 135.817 16.5561 136.04 16.2268V18.4745H137.001V4.08502H136.04ZM136.098 13.4689C136.098 14.1126 135.984 14.6978 135.755 15.2237C135.526 15.7496 135.222 16.2028 134.841 16.5839C134.462 16.965 134.026 17.2614 133.535 17.4714C133.043 17.6823 132.536 17.7873 132.013 17.7873C131.489 17.7873 130.988 17.6853 130.51 17.4819C130.032 17.2786 129.613 16.989 129.253 16.6147C128.893 16.2403 128.608 15.7834 128.398 15.2447C128.189 14.7061 128.085 14.1081 128.085 13.4509V13.4112C128.085 12.7412 128.186 12.1395 128.389 11.6076C128.592 11.0757 128.87 10.6256 129.224 10.2572C129.577 9.88958 129.993 9.60674 130.471 9.40943C130.949 9.21212 131.463 9.11384 132.013 9.11384C132.537 9.11384 133.044 9.21887 133.535 9.42893C134.026 9.63975 134.461 9.93159 134.841 10.306C135.221 10.6803 135.526 11.1342 135.755 11.6661C135.984 12.1988 136.098 12.787 136.098 13.4307V13.4689Z"
                      fill="white"/>
                <path d="M107.442 8.86549L107.005 8.42585V8.42285H103.517V7.45655C103.517 5.76103 104.19 4.91326 105.536 4.91326C105.797 4.91326 106.038 4.93277 106.26 4.97253C106.482 5.01155 106.737 5.07757 107.025 5.16984V4.26281C106.802 4.18404 106.574 4.12477 106.339 4.08576C106.103 4.046 105.835 4.02649 105.536 4.02649C104.66 4.02649 103.961 4.28982 103.439 4.81498C102.85 5.40692 102.556 6.28094 102.556 7.43705V8.42285H101.14V8.4221H99.5334V8.42285H98.9526V10.4335C98.743 10.1446 98.5022 9.8618 98.2277 9.58571C97.9533 9.30963 97.6468 9.0703 97.3068 8.86624C96.9668 8.66218 96.585 8.49863 96.1607 8.37334C95.7364 8.2488 95.2755 8.18578 94.7797 8.18578C94.1786 8.18578 93.591 8.29756 93.0161 8.52113C92.4412 8.7447 91.9289 9.0628 91.4777 9.47693C91.0273 9.89106 90.6642 10.3937 90.3898 10.9849C90.1154 11.5761 89.9781 12.234 89.9781 12.9558V12.9955C89.9781 13.7187 90.1154 14.3692 90.3898 14.9476C90.6642 15.5261 91.0266 16.022 91.4777 16.4361C91.9281 16.8502 92.4412 17.1691 93.0161 17.3919C93.591 17.6155 94.1786 17.7272 94.7797 17.7272C95.2755 17.7272 95.7334 17.665 96.1517 17.5404C96.5693 17.4159 96.9481 17.2448 97.2882 17.028C97.6275 16.8112 97.9347 16.5651 98.2091 16.289C98.4835 16.013 98.7318 15.7174 98.954 15.4023V16.8607C98.954 17.5044 98.8556 18.0678 98.6595 18.551C98.4626 19.0334 98.1912 19.4385 97.8445 19.7649C97.497 20.0912 97.0846 20.3366 96.6066 20.4994C96.1279 20.6629 95.6014 20.7439 95.025 20.7439C93.5455 20.7439 92.1966 20.2713 90.9789 19.3245L90.4106 20.113C91.7842 21.1513 93.3159 21.6705 95.0049 21.6705C95.7513 21.6705 96.4351 21.5549 97.057 21.3254C97.6789 21.095 98.2061 20.7634 98.6386 20.3298C99.0443 19.9224 99.3582 19.4355 99.5812 18.8713C99.8041 18.3064 99.9152 17.6552 99.9152 16.9192V9.30588H101.108V9.30963H102.559V18.4767H103.519V9.30963H107.007V9.30513L107.442 8.86549ZM99.0115 12.976C99.0115 13.5544 98.8936 14.0774 98.658 14.5433C98.4224 15.0099 98.1114 15.4105 97.7251 15.7459C97.3389 16.0812 96.8967 16.3408 96.3993 16.5246C95.9012 16.7092 95.3911 16.8007 94.8669 16.8007C94.3561 16.8007 93.8654 16.7054 93.3934 16.5149C92.9221 16.3243 92.509 16.0617 92.1563 15.7264C91.8029 15.391 91.521 14.9866 91.3114 14.514C91.1019 14.0406 90.9975 13.5214 90.9975 12.9565V12.9175C90.9975 12.3256 91.0989 11.7974 91.3018 11.3308C91.5046 10.8641 91.7827 10.4665 92.1369 10.1379C92.4904 9.80928 92.9027 9.55646 93.3748 9.37865C93.846 9.2016 94.3434 9.11232 94.8676 9.11232C95.3911 9.11232 95.9019 9.20085 96.4 9.37865C96.8974 9.55571 97.3389 9.81228 97.7259 10.1476C98.1122 10.483 98.4231 10.8874 98.6588 11.36C98.8944 11.8327 99.0122 12.3586 99.0122 12.937V12.976H99.0115Z"
                      fill="white"/>
                <path d="M20.8264 20.9534C25.5906 16.1602 25.5906 8.38896 20.8264 3.59578C16.0622 -1.19739 8.33801 -1.19739 3.57385 3.59578C-1.19031 8.38896 -1.19031 16.1602 3.57385 20.9534C8.33801 25.7466 16.0622 25.7466 20.8264 20.9534Z"
                      fill="#EAEAEA"/>
                <path d="M12.2003 23.5844C18.4078 23.5844 23.4401 18.5215 23.4401 12.2761C23.4401 6.03072 18.4078 0.967834 12.2003 0.967834C5.99268 0.967834 0.960449 6.03072 0.960449 12.2761C0.960449 18.5215 5.99268 23.5844 12.2003 23.5844Z"
                      fill="#04274C"/>
                <g opacity="0.12">
                    <path opacity="0.12"
                          d="M5.77616 2.99791C0.686065 6.56827 -0.562968 13.6152 2.98652 18.7363L21.4193 5.80453C17.8698 0.683445 10.8663 -0.573195 5.77616 2.99791Z"
                          fill="#F2F2F2"/>
                </g>
                <path d="M12.2122 20.9412C10.6842 20.9412 9.2555 20.1917 8.39049 18.9351C7.91996 18.2509 7.63958 17.4474 7.57993 16.6101L7.56874 16.4586L13.1845 12.5424L10.4508 12.5356L8.27939 14.0451L7.90356 13.967L7.9744 13.6077L9.84534 12.3083L9.54855 12.1012C9.08548 11.7786 8.69175 11.3847 8.37931 10.9309C6.92148 8.81444 7.44719 5.89979 9.55005 4.43233C10.3256 3.89141 11.2375 3.60632 12.1883 3.60632C12.3814 3.60707 12.55 3.61833 12.7334 3.64008L12.7983 3.64909C12.9564 3.67009 13.1062 3.69785 13.2554 3.73311L13.3307 3.75037C13.4933 3.79163 13.6543 3.8404 13.8124 3.89966C14.0003 3.96869 14.1666 4.04296 14.3232 4.12473C14.4873 4.21176 14.6245 4.29429 14.7587 4.38357L14.8773 4.46759C14.9779 4.53886 15.0756 4.61539 15.1718 4.69566C15.2158 4.73242 15.2598 4.76994 15.3023 4.80895C15.3933 4.89222 15.4813 4.98 15.567 5.07153L15.6781 5.19007C15.8064 5.33636 15.9145 5.47515 16.0092 5.61245C16.4798 6.29666 16.7601 7.10016 16.819 7.93667L16.8295 8.08822L11.2114 12.0052L13.884 12.0112L16.0913 10.477L16.4671 10.5542L16.3962 10.9136L14.5171 12.2183L14.8184 12.4238C15.2941 12.7502 15.6983 13.1508 16.0182 13.6152C16.7229 14.6393 16.9898 15.8794 16.7683 17.1083C16.5469 18.3372 15.8646 19.404 14.8467 20.1137C14.7281 20.1955 14.6066 20.2705 14.4828 20.3403L14.3888 20.3905C14.2777 20.4491 14.1905 20.4926 14.1017 20.5323L13.966 20.5924C13.8736 20.6306 13.7789 20.6651 13.6827 20.6974L13.5731 20.7364C13.4537 20.7732 13.3314 20.8047 13.2084 20.8309C13.1644 20.8407 13.1227 20.8482 13.0809 20.8557L13.0257 20.8654C12.9579 20.8774 12.887 20.8887 12.8169 20.8985C12.7483 20.9075 12.682 20.915 12.6148 20.9217C12.5507 20.9277 12.4851 20.93 12.4195 20.933L12.3717 20.9352C12.3203 20.9382 12.2696 20.9412 12.2181 20.9412H12.2122ZM8.11832 16.7242L8.14069 16.8779C8.23241 17.5074 8.46879 18.1143 8.82523 18.6312C9.5918 19.7446 10.8572 20.4093 12.2107 20.4093C12.2614 20.4093 12.3024 20.407 12.3442 20.4048L12.3911 20.4025C12.453 20.4003 12.5142 20.3965 12.5753 20.3913C12.632 20.3868 12.6894 20.3793 12.7468 20.3718C12.811 20.3635 12.8743 20.353 12.9377 20.3418C12.9377 20.3418 13.0578 20.32 13.0951 20.3118C13.2039 20.2878 13.3136 20.26 13.4217 20.2262L13.4836 20.2045C13.5984 20.1655 13.6842 20.134 13.7692 20.0987L13.8624 20.0582C13.966 20.0109 14.0428 19.9734 14.1189 19.9329L14.2263 19.8751C14.3337 19.8144 14.4418 19.7483 14.5469 19.6748C16.4097 18.3762 16.875 15.7939 15.5842 13.919C15.2277 13.4014 14.746 12.9655 14.1927 12.6586L14.057 12.5836L8.11832 16.7242ZM12.1898 4.14049C11.3479 4.14049 10.5396 4.39332 9.8528 4.87347C8.95125 5.50141 8.34724 6.44671 8.15113 7.5353C7.95501 8.62313 8.19065 9.72223 8.81554 10.6285C9.17198 11.1469 9.6537 11.5828 10.207 11.8896L10.3427 11.9639L16.2814 7.82413L16.259 7.67034C16.1681 7.04239 15.9317 6.4362 15.5745 5.91704C15.4835 5.78425 15.3843 5.66121 15.2807 5.54268C15.2591 5.51792 15.183 5.43914 15.183 5.43914C15.1069 5.35812 15.0301 5.28009 14.9489 5.20657C14.9108 5.17281 14.8728 5.13905 14.834 5.10679C14.749 5.03552 14.6625 4.96875 14.573 4.90498L14.4679 4.8307C14.3493 4.75193 14.2278 4.67841 14.1032 4.61314C13.9392 4.52761 13.7923 4.46234 13.6424 4.40532C13.4977 4.35055 13.3501 4.30629 13.2024 4.26878L13.142 4.25452C13.0086 4.22301 12.8736 4.19826 12.7371 4.18025L12.6797 4.17275C12.5283 4.15474 12.3755 4.14349 12.2234 4.14199H12.1898V4.14049Z"
                      fill="white"/>
                <path d="M16.8302 8.08895L16.8198 7.9374C16.7609 7.10089 16.4805 6.29739 16.01 5.61318C15.9153 5.47589 15.8071 5.33784 15.6789 5.1908L15.567 5.07226C15.4813 4.98073 15.394 4.89296 15.3031 4.80968C15.2606 4.77067 15.2166 4.73391 15.1726 4.69639C15.0771 4.61612 14.9787 4.54035 14.878 4.46832L14.7594 4.3843C14.6252 4.29502 14.488 4.21249 14.324 4.12547C14.1674 4.04444 14.0011 3.97017 13.8132 3.9004C13.6558 3.84113 13.4948 3.79236 13.3315 3.7511L13.2561 3.73384C13.107 3.69858 12.9571 3.67083 12.799 3.64982L12.7342 3.64082C12.5507 3.61906 12.3822 3.60781 12.1891 3.60706C11.2383 3.60706 10.3263 3.89214 9.5508 4.43306C7.4472 5.89977 6.92223 8.81517 8.38006 10.9316C8.6925 11.3855 9.08623 11.7793 9.5493 12.1019L9.84609 12.309L7.97515 13.6084L7.90431 13.9678L8.28014 14.0458L10.4516 12.5363L11.8192 12.5393L12.5761 12.0082L11.2129 12.0052L16.8302 8.08895ZM10.342 11.9639L10.207 11.8896C9.6537 11.5835 9.17273 11.1469 8.81554 10.6285C8.19065 9.72221 7.95502 8.62311 8.15113 7.53528C8.34725 6.44669 8.95201 5.50139 9.8528 4.87345C10.5396 4.39405 11.3479 4.14047 12.1898 4.14047H12.2234C12.3762 4.14197 12.5283 4.15323 12.6797 4.17123L12.7371 4.17873C12.8729 4.19674 13.0086 4.22225 13.142 4.25301L13.2024 4.26726C13.3508 4.30477 13.4977 4.34904 13.6432 4.4038C13.793 4.46082 13.9399 4.52609 14.104 4.61162C14.2285 4.67689 14.3501 4.74966 14.4686 4.82919L14.5738 4.90346C14.6633 4.96723 14.7498 5.034 14.8348 5.10527C14.8735 5.13828 14.9123 5.17129 14.9496 5.20505C15.0309 5.27857 15.1077 5.3566 15.1837 5.43762C15.1837 5.43762 15.2598 5.51715 15.2814 5.54116C15.3843 5.65969 15.4835 5.78273 15.5752 5.91552C15.9324 6.43468 16.1688 7.04087 16.2598 7.66882L16.2822 7.82262L10.342 11.9639Z"
                      fill="#EAEAEA"/>
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="137" height="24.5491" fill="white"/>
                </clipPath>
            </defs>
        </svg>`,
    styles: ['']
})
export class LogoComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
