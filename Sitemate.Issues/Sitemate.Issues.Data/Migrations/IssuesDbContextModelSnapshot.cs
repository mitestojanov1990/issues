﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Sitemate.Issues.Data;

#nullable disable

namespace Sitemate.Issues.Data.Migrations
{
    [DbContext(typeof(IssuesDbContext))]
    partial class IssuesDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Sitemate.Issues.Data.Models.Issue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(4000)
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Issues", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "This is created on start of backend, seeding data..",
                            Title = "Issues form doesn't work"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
