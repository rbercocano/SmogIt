CREATE TABLE [dbo].[Clients] (
    [ClientId]         INT           IDENTITY (1, 1) NOT NULL,
    [FirstName]        VARCHAR (50)  NOT NULL,
    [LastName]         VARCHAR (50)  NULL,
    [Email]            VARCHAR (200) NULL,
    [Phone]            VARCHAR (20)  NOT NULL,
    [RegistrationDate] DATETIME      CONSTRAINT [DF_Clients_RegistrationDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED ([ClientId] ASC)
);
