package com.example.xhealth.network


import kotlinx.serialization.EncodeDefault
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class healthRecordNew(
    @SerialName("email")
    var email: String,
    @SerialName("history")
    var history: List<History>,
    @SerialName("_id")
    var id: String,
    @SerialName("__v")
    var v: Int
) {
    @Serializable
    data class History(
        @SerialName("diagnoses")
        var diagnoses: Diagnoses,
        @SerialName("doctorId")
        var doctorId: String,
        @SerialName("_id")
        var id: String,
        @SerialName("immunizations")
        var immunizations: List<Immunization>,
        @SerialName("medications")
        var medications: Medications,
        @SerialName("scans")
        var scans: List<Scan>,
        @SerialName("time")
        var time: String
    ) {
        @Serializable
        data class Diagnoses(
            @SerialName("data")
            var `data`: String,
            @SerialName("problems")
            var problems: List<String>
        )

        @Serializable
        data class Immunization(
            @SerialName("dosage")
            var dosage: Int=0,
            @SerialName("_id")
            var id: String="non",
            @SerialName("name")
            var name: String="non"
        )

        @Serializable
        data class Medications(
            @SerialName("allMeds")
            var allMeds: List<AllMed>,
            @SerialName("endDate")
            var endDate: String,
            @SerialName("startDate")
            var startDate: String
        ) {
            @Serializable
            data class AllMed(
                @SerialName("dosage")
                var dosage: Int,
                @SerialName("gap")
                var gap: Int,
                @SerialName("_id")
                var id: String,
                @SerialName("name")
                var name: String,
                @SerialName("perDay")
                var perDay: Int,
                @SerialName("timings")
                var timings: List<String>
            )
        }

        @Serializable
        data class Scan @OptIn(ExperimentalSerializationApi::class) constructor(
            @SerialName("_id")
            var id: String,
            @SerialName("name")
            var name: String="NaN",
            @SerialName("pdfLink")
            var pdfLink: String="NaN",
            @SerialName("typeOf")
            var typeOf: String="NaN"
        )
    }
}