package mailSending;

public class SendApplySuccessfullyMail {
	private GmailSender gmailSender_;

	public SendApplySuccessfullyMail() {
		String username = "news.teddysoft.tw@gmail.com";
		String password = "clfddzifoyfvvxqa";
		gmailSender_ = new GmailSender(username, password);
	}

	public String Send(String studentName, String eMailAddress, String ccAddresses, String courseName,
			String courseHyperLink) {
		String subject = courseName + " - 已收到您的報名資料";
		String text = "Hi " + studentName + "，<br><br>您好，歡迎報名<a href=\"" + courseHyperLink + "\">" + courseName
				+ "</a>，我們已收到您填寫的相關資料。<br><br>本梯次課程目前招生中，若達開課人數，我們會再通知您後續繳費的相關事宜，最遲於開課前十天通知。如果有任何問題，歡迎和我們聯絡 : ) <br><br><br>泰迪軟體 Erica<br><br>-- <br>泰迪軟體科技有限公司 <br>Teddysoft Technology<br>02-2311-6230<br> <a href=\"http://teddysoft.tw\">http://teddysoft.tw </a>";
		String result = gmailSender_.send(eMailAddress, ccAddresses, subject, text, null);
		return result;
	}
}
