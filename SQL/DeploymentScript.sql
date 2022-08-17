USE RenewableEnergyHomes

IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'Property')
BEGIN
    
	CREATE TABLE dbo.Property
	(
		Id INT NOT NULL IDENTITY(1,1),
		DateCreated DATETIME NOT NULL,
		Postcode VARCHAR(7),
		HouseNumber SMALLINT,
		HouseName NVARCHAR(255),
		AddressLine1 NVARCHAR(255),
		AddressLine2 NVARCHAR(255),
		AddressLine3 NVARCHAR(255),
		Town NVARCHAR(255),
		County NVARCHAR(255),
		EpcRating NVARCHAR(5)
		CONSTRAINT PK_Property_ID PRIMARY KEY (ID)
	)

	CREATE INDEX IX_Property_Postcode ON dbo.Property (Postcode);   

END

IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'PropertySale')
BEGIN
    
	CREATE TABLE dbo.PropertySale
	(
		Id INT NOT NULL IDENTITY(1,1),
		PropertyId INT NOT NULL,
		DateOfSale DATE NULL,
		SaleAmount BIGINT NULL
		CONSTRAINT PK_PropertySale_Id PRIMARY KEY (Id),
		CONSTRAINT FK_PropertySale_Property FOREIGN KEY (PropertyId) REFERENCES Property(Id)
	)

END


IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'PropertyFeatureLookup')
BEGIN
    
	CREATE TABLE dbo.PropertyFeatureLookup
	(
		Id INT NOT NULL IDENTITY(1,1),
		Label NVARCHAR(255) NOT NULL,
		CONSTRAINT PK_PropertyFeatureLookup_Id PRIMARY KEY (Id),
	)

END


IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'PropertyFeature')
BEGIN
    
	CREATE TABLE dbo.PropertyFeature
	(
		PropertyId INT NOT NULL,
		PropertyFeatureId INT NOT NULL,
		CONSTRAINT PK_PropertyFeature_ID PRIMARY KEY (PropertyId, PropertyFeatureId),
		CONSTRAINT FK_PropertyFeature_Property FOREIGN KEY (PropertyId) REFERENCES Property(Id),
		CONSTRAINT FK_PropertyFeature_Feature FOREIGN KEY (PropertyFeatureId) REFERENCES PropertyFeatureLookup(Id)
	)

END

GO

IF EXISTS (
	SELECT 1 from dbo.sysobjects
	WHERE [name] = 'PropertySalesByPostcode'
	AND [type] = 'P')
BEGIN
	DROP PROCEDURE dbo.PropertySalesByPostcode
END

GO

CREATE PROCEDURE dbo.PropertySalesByPostcode
    @Postcode VARCHAR(7)
AS
BEGIN

	DECLARE @PropertyIds TABLE (
		Id INT NOT NULL
	)

	INSERT INTO @PropertyIds
	SELECT p.Id
	FROM dbo.Property p
	WHERE p.Postcode = @Postcode

	SELECT 
		p.Id,
		p.Postcode,
		p.HouseNumber,
		p.HouseName,
		p.AddressLine1,
		p.AddressLine2,
		p.AddressLine3,
		p.Town,
		p.County,
		p.EpcRating,
		ps.DateOfSale,
		ps.SaleAmount
	FROM dbo.Property p
	INNER JOIN 
	(
		SELECT
			PropertyId,
			DateOfSale,
			SaleAmount,
			ROW_NUMBER() OVER (PARTITION BY PropertyId ORDER BY DateOfSale DESC) AS MostRecent
		FROM dbo.PropertySale
	) ps ON ps.PropertyId = p.Id
	WHERE p.Id IN (
		SELECT Id FROM @PropertyIds
	)
	AND ps.MostRecent = 1
	

	SELECT
		pf.PropertyId,
		pf.PropertyFeatureId,
		pfl.Label
	FROM dbo.PropertyFeature pf
	INNER JOIN dbo.PropertyFeatureLookup pfl
		ON pfl.Id = pf.PropertyFeatureId
	WHERE pf.PropertyId IN (
		SELECT Id FROM @PropertyIds
	)

END

GO

IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.PropertyFeatureLookup)
BEGIN

	INSERT INTO dbo.PropertyFeatureLookup
	(Label)
	VALUES
		('Battery storage unit'),
		('Solar panel roof installation'),
		('Wind turbine generator'),
		('EV charging point')

END

GO

IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.Property)
BEGIN

	INSERT INTO dbo.Property
	(
		DateCreated,
		Postcode,
		HouseNumber,
		HouseName,
		AddressLine1,
		AddressLine2,
		AddressLine3,
		Town,
		County,
		EpcRating
	)
	VALUES
		(GETDATE(), 'SW11AA', NULL, 'Buckingham Palace', NULL, NULL, NULL, 'London', NULL, NULL),

		(GETDATE(), 'CO38WR', 4, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex', 'A94'),
		(GETDATE(), 'CO38WR', 11, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex', 'C71'),
		(GETDATE(), 'CO38WR', 35, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex', 'B83'),
		(GETDATE(), 'CO38WR', 63, NULL, 'Robin Crescent', 'Stanway', NULL, 'Colchester', 'Essex', 'B90'),
		
		(GETDATE(), 'S337ZP', 22, NULL, 'Edale Road', NULL, NULL, 'Edale', 'Derbyshire', 'E45'),
		(GETDATE(), 'S337ZP', 47, NULL, 'Edale Road', NULL, NULL, 'Edale', 'Derbyshire', 'B88')


END


IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.PropertyFeature)
BEGIN

	INSERT INTO dbo.PropertyFeature
	(
		PropertyId,
		PropertyFeatureId
	)
	VALUES
		(2, 1),
		(2, 2),
		(2, 3),
		(2, 4),
		(3, 4),
		(4, 1),
		(4, 2),
		(5, 3),
		(5, 4)

END

GO

IF NOT EXISTS (SELECT TOP(1) 1 FROM dbo.PropertySale)
BEGIN

	INSERT INTO dbo.PropertySale
	(
		PropertyId,
		DateOfSale,
		SaleAmount
	)
	VALUES
		(1, NULL, 4900000000),

		(2, DATEADD(MONTH, -20, GETDATE()), 400000),
		(2, DATEADD(MONTH, -90, GETDATE()), 300000),
		(2, DATEADD(MONTH, -175, GETDATE()), 200000),
		(3, DATEADD(MONTH, -135, GETDATE()), 150000),
		(3, DATEADD(MONTH, -115, GETDATE()), 200000),
		(3, DATEADD(MONTH, -95, GETDATE()), 250000),
		(3, DATEADD(MONTH, -60, GETDATE()), 300000),
		(3, DATEADD(MONTH, -30, GETDATE()), 350000),		
		(4, DATEADD(MONTH, -10, GETDATE()), 790000),
		(4, DATEADD(MONTH, -250, GETDATE()), 540000),
		(5, DATEADD(MONTH, -44, GETDATE()), 550000),
		(5, DATEADD(MONTH, -55, GETDATE()), 440000),

		(6, DATEADD(MONTH, -66, GETDATE()), 660000),
		(6, DATEADD(MONTH, -88, GETDATE()), 440000),
		(7, DATEADD(MONTH, -77, GETDATE()), 770000),
		(7, DATEADD(MONTH, -99, GETDATE()), 550000)

END

