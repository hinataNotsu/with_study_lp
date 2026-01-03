'use client';

import { useEffect } from 'react';
import liff from '@line/liff';

export default function InvitePage() {
  useEffect(() => {
    const initLiff = async () => {
      try {
        // 直接書き込み（例: "200xxxxxxx-xxxxxxxx"）
        await liff.init({ liffId: "2008813398-9V1J7we4" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        if (liff.isApiAvailable('shareTargetPicker')) {
          await liff.shareTargetPicker([
            {
              "type": "flex",
              "altText": "アプリへの招待が届きました",
              "contents": {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    { "type": "text", "text": "一緒にアプリで遊びましょう！", "weight": "bold", "size": "lg" }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#06C755",
                      "action": {
                        "type": "uri",
                        "label": "アプリを開く",
                        "uri": "https://your-app-url.com" // ここもアプリのURLに書き換え
                      }
                    }
                  ]
                }
              }
            }
          ]);
          liff.closeWindow();
        }
      } catch (error) {
        console.error("LIFFの起動に失敗しました", error);
      }
    };

    initLiff();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">LINEを起動しています...</p>
      </div>
    </div>
  );
}