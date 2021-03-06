# 筋トレ成果記録アプリ

日々の筋トレ成果を記録し成長を実感することで、モチベーションを上げ、筋力アップ、ひいては自己肯定感、忍耐力などの向上に貢献します。

# 使用技術
フロントエンドはTypeScriptとReactで構築して、直感的で操作しやすいユーザーインターフェースにしました。Prettier、ESLintでコードの整形も行いました。

バックエンドはExpressで構築し、Passport.jsでユーザー登録機能、認証機能を作成しました。アプリからサーバーに送ったパスワードはbcryptでハッシュ化したものをDBに保存するようにしました。

インフラにはAWSのEC2でWebサーバーとDBサーバーを構築しました。AWSのDNSサービスRoute53でURLとIPアドレスを紐付けしました。WebサーバーはApacheで構築し、.htaccessを編集しSPAにしました。DBサーバーはMySQLで構築しました。インターネットから直接接続できないサブネットに配置しています。

ブラウザとサーバー間の通信はLet'sEncryptで証明書を取得してHTTPSにしました。