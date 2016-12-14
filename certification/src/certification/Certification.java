package certification;

public class Certification {
	private String id_ = "";
	private String owner_ = "";
	private String date_ = "";
	private String courceDate_ = "";
	private String courceName_ = "";
	private String courceDuration_ = "";
	private String courceId_="";

	public Certification() {
	}

	public Certification(String courseId, String owner, String certificationDate, String courceDate, String courceName, String courceDuration) {
		id_ = courseId;
		owner_ = owner;
		date_ = certificationDate;
		courceDate_ = courceDate;
		courceName_ = courceName;
		courceDuration_ = courceDuration;
	}

	@Override
	public Certification clone() {
		Certification cloneObject = new Certification();
		cloneObject.setId(this.getId());
		cloneObject.setOwner(this.getOwner());
		return cloneObject;
	}

	public void setId(String id) {
		id_ = id;
	}

	public void setOwner(String owner) {
		owner_ = owner;
	}

	public void setDate(String date) {
		date_ = date;
	}

	public void setCourceDate(String courceDate) {
		courceDate_ = courceDate;
	}

	public void setCourceName(String courceName) {
		courceName_ = courceName;
	}

	public void setCourceDuration(String courceDuration) {
		courceDuration_ = courceDuration;
	}
	
	public void setCourceId(String courceId)
	{
		courceId_=courceId;
	}

	public String getId() {
		return id_;
	}

	public String getOwner() {
		return owner_;
	}

	public String getDate() {
		return date_;
	}

	public String getCourceDate() {
		return courceDate_;
	}

	public String getCourceName() {
		return courceName_;
	}

	public String getCourceDuration() {
		return courceDuration_;
	}
	
	public String getCourceId()
	{
		return courceId_;
	}
}